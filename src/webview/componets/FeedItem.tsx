import React from 'react';
import {
  Typography, withStyles, WithStyles, createStyles, Box, Chip,
} from '@material-ui/core';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { Category } from '../type/Category';
import dateFormat from '../lib/date-format';
import { useStore } from '../store';

const styles = createStyles({
  root: {
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  content: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
    minHeight: 70,
    maxHeight: 80,
    maxWidth: 500,
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    marginBottom: 10,
    lineHeight: 1.6,
    overflowY: 'hidden',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    display: '-webkit-box',
  },
  image: {
    width: '25%',
    minWidth: 100,
    marginLeft: 10,
  },
  metadata: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 14,
  },
  chip: {
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
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

  const chipOnClick = (categoryId: string | number) => (): void => {
    store.category?.changeOpen(false);
    Router.push(`/category/${categoryId}`);
  };

  const Image = dynamic(() => import('material-ui-image'), { ssr: false });

  return (
    <Box key={id} display="flex" flexDirection="column" className={classes.root}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="column">
          <Typography variant="h5">{title}</Typography>
          <p className={classes.content}>{summary}</p>
          <Box>
            {categories.map((category) => (
              <Chip
                className={classes.chip}
                key={category.id}
                label={category.name}
                size="small"
                clickable
                color="primary"
                onClick={chipOnClick(category.id)}
              />
            ))}
          </Box>
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
