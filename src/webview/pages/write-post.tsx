import React from 'react';
import Router from 'next/router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Request, Response } from 'express';
import SubmitBar from '../componets/SummitBar';
import MarkdownEditor from '../componets/MarkdownEditor';
import { getSignedUrl } from '../lib/api/image';
import { Store } from '../store';

interface CustomNextPage<P> {
  (props: P): JSX.Element;
  getInitialProps: (ctx: CustomNextPageProps) => Promise<P>;
}

interface CustomNextPageProps {
  req: Request;
  res: Response;
  store: Store;
}

interface Props {
  isAuthenticated: boolean;
}

const useStyles = makeStyles({
  root: {
    justifyContent: 'space-between',
    height: '100%',
  },
});

const PageWritePost: CustomNextPage<Props> = () => {
  const classes = useStyles();

  const onImageUpload = async (file: File): Promise<string> => {
    const filename = file.name;
    const kind = 'post';

    const res = await getSignedUrl({ filename, kind });
    await axios.put(res.data.uploadUri, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    //eslint-disable-next-line max-len
    return res.data.realUri;
  };

  return (
    <Box display="flex" className={classes.root} flexDirection="column" justifyContent="space-between">
      <MarkdownEditor onImageUpload={onImageUpload} />
      <SubmitBar />
    </Box>
  );
};

PageWritePost.getInitialProps = async (ctx: CustomNextPageProps): Promise<Props> => {
  const isServer = typeof window === 'undefined';

  if (!ctx.req?.session?.user && isServer) {
    ctx.res.writeHead(302, { Location: '/api/v1/user/google' });
    ctx.res.end();
    return { isAuthenticated: false };
  }

  if (!ctx.store.user && !isServer) {
    Router.push('/api/v1/user/google');
    return { isAuthenticated: false };
  }

  return { isAuthenticated: true };
};

export default PageWritePost;
