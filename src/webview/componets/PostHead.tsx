import React from 'react';
import {
  withStyles, WithStyles, createStyles, Typography, Box,
} from '@material-ui/core';
import Router from 'next/router';
import CategoryTag from './CategoryTag';
import dateFormat from '../lib/date-format';
import { Category } from '../type';
import { useStore } from '../store';
import { deletePost } from '../lib/api/post';

const styles = createStyles({
  root: {
    marginTop: '3%',
    width: '100%',
    maxWidth: 900,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: '1%',
  },
  title: {
    fontSize: '5vh',
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  createdAt: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '2vh',
  },
  menu: {
    marginRight: 10,
    color: 'blue',
    cursor: 'pointer',
  },
});

interface Props extends WithStyles<typeof styles> {
  title?: string;
  createdAt?: string;
  categories?: Array<Category>;
  id: number;
}

const PostHead: React.FC<Props> = ({
  classes,
  title,
  createdAt,
  categories,
  id,
}) => {
  const store = useStore();

  const remove = async (): Promise<void> => {
    await deletePost(id);
    Router.push('/');
  };

  const editOnClick = (): void => {

  };

  const deleteOnClick = (): void => {
    remove();
  };

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      <CategoryTag categories={categories || []} />
      <Typography className={classes.createdAt}>{dateFormat(new Date(createdAt || ''))}</Typography>
      {store.user?.role === 'admin'
        ? (
          <Box display="flex" flexDirection="row">
            <Typography className={classes.menu} onClick={editOnClick}>편집</Typography>
            <Typography className={classes.menu} onClick={deleteOnClick}>삭제</Typography>
          </Box>
        )
        : null}
    </Box>
  );
};
export default withStyles(styles)(PostHead);
