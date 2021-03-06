import React from 'react';
import {
  withStyles, WithStyles, createStyles, Box,
} from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import getImage from 'get-md-image';
import CustomButton from './Button';
import { useStore } from '../store';
import { createPost, putPost } from '../lib/api/post';

const styles = createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 10px 0px rgba(0,0,0,0.2)',
  },
});

interface Props extends WithStyles<typeof styles> {
  id?: number;
}

const SubmitBar: React.FC<Props> = observer<Props>(({
  classes,
  id,
}) => {
  const store = useStore();

  if (!store.post) {
    return null;
  }

  const { post } = store;

  const send = async (
    title: string, content: string, categoryNames: Array<string>, thumbnail?: string,
  ): Promise<void> => {
    const { status } = await createPost({
      title, content, categoryNames, thumbnail,
    });

    if (status !== 201) {
      alert(`error: ${status}`);
    }

    Router.push('/');
  };

  const update = async (
    title: string, content: string, categoryNames: Array<string>, postId: number, thumbnail?: string,
  ): Promise<void> => {
    const { status } = await putPost({
      title, content, categoryNames, thumbnail,
    }, postId);

    if (status !== 201) {
      alert(`error: ${status}`);
      return;
    }

    Router.push('/');
  };

  const sendOnClick = (): void => {
    const { title, content, tags } = post;

    const image = getImage(content);

    id ? update(title, content, tags, id, image?.src) : send(title, content, tags, image?.src);
  };

  return (
    <Box display="flex" flex={1} className={classes.root} borderTop={1} borderColor="grey.300">
      <CustomButton text="취소" color="default" />
      <CustomButton text="작성 완료" color="primary" buttonOnClick={sendOnClick} />
    </Box>
  );
});

export default withStyles(styles)(SubmitBar);
