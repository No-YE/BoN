import React, { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Request, Response } from 'express';
import SubmitBar from '../componets/SummitBar';
import MarkdownEditor from '../componets/MarkdownEditor';
import { getSignedUrl } from '../lib/api/image';
import { Store, useStore } from '../store';
import { getPostById } from '../lib/api/post';

interface CustomNextPage<P> {
  (props: P): JSX.Element;
  getInitialProps: (ctx: CustomNextPageProps) => Promise<P>;
}

interface CustomNextPageProps {
  req: Request;
  res: Response;
  store: Store;
  query: {
    [key: string]: string;
  };
}

interface Props {
  id?: number;
}

const useStyles = makeStyles({
  root: {
    justifyContent: 'space-between',
    height: '100%',
  },
});

const PageWritePost: CustomNextPage<Props> = ({
  id,
}) => {
  const classes = useStyles();
  const store = useStore();

  store.setPost();


  const onImageUpload = async (file: File): Promise<string> => {
    const filename = file.name;
    const kind = 'post';

    const res = await getSignedUrl({ filename, kind });
    await axios.put(res.data.uploadUri, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    return res.data.realUri;
  };

  useEffect(() => {
    //eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id && (async (): Promise<void> => {
      const res = await getPostById(id);
      const { title, content, categories } = res.data;
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      store.setPost(title, content, categories.map((category: any) => category.name));
    })();
  }, []);

  return (
    <Box display="flex" className={classes.root} flexDirection="column" justifyContent="space-between">
      <MarkdownEditor onImageUpload={onImageUpload} />
      <SubmitBar id={id} />
    </Box>
  );
};

PageWritePost.getInitialProps = async (ctx: CustomNextPageProps): Promise<Props> => {
  const isServer = typeof window === 'undefined';

  if (!ctx.req?.session?.user && isServer) {
    ctx.res.writeHead(302, { Location: '/api/v1/user/google' });
    ctx.res.end();
    return { id: undefined };
  }

  if (!ctx.store.user && !isServer) {
    Router.push('/api/v1/user/google');
    return { id: undefined };
  }

  return { id: ctx.query.id ? Number(ctx.query.id) : undefined };
};

export default PageWritePost;
