import React from 'react';
import {
  Typography, withStyles, WithStyles, createStyles, Box,
} from '@material-ui/core';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Category } from '../type/Category';
import dateFormat from '../lib/date-format';
import { useStore } from '../store';
import CategoryTag from './CategoryTag';

const styles = createStyles({
  root: {
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: '3vh',
  },
  content: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '1.9vh',
    minHeight: 70,
    maxHeight: 80,
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    marginBottom: 10,
    lineHeight: 1.6,
    overflowY: 'hidden',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    display: '-webkit-box',
  },
  pointer: {
    cursor: 'pointer',
  },
  image: {
    minWidth: 'min(30%, 23vh)',
    marginLeft: 10,
  },
  metadata: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '1.8vh',
  },
});

interface Props extends WithStyles<typeof styles> {
  id: string | number;
  title: string;
  summary: string;
  createdAt: Date;
  thumbnail?: string;
  categories: Array<Category>;
}

const FeedItem: React.FC<Props> = ({
  classes,
  id,
  title,
  summary,
  thumbnail,
  createdAt,
  categories,
}) => {
  const store = useStore();

  const goToPost = (): void => {
    store.category?.changeOpen(false);
    Router.push(`/post/${id}`);
  };

  const Image = dynamic(() => import('material-ui-image'), { ssr: false });

  return (
    <Box key={id} display="flex" flexDirection="column" className={classes.root}>
      <Typography variant="h5" className={`${classes.pointer} ${classes.title}`} onClick={goToPost}>{title}</Typography>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          <Typography className={`${classes.content} ${classes.pointer}`} onClick={goToPost}>{summary}</Typography>
          <CategoryTag categories={categories} />
          <Typography className={classes.metadata}>{dateFormat(new Date(createdAt))}</Typography>
        </Box>
        {thumbnail
          ? <Box className={classes.image}><Image src={thumbnail} aspectRatio={4 / 3} /></Box>
          : null}
      </Box>
    </Box>
  );
};

export default withStyles(styles)(FeedItem);
