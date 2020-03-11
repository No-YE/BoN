import React from 'react';
import { NextPage } from 'next';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Copy from '../componets/CategoryList';
import Header from '../componets/Header';
import { useStore } from '../store';
import FeedList from '../componets/FeedList';
import { getAllCategories, getPosts } from '../lib/api/post';
import { Feed, Category } from '../type';

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'center',
  },
});

interface Props {
  feeds: Array<Feed>;
  categories: Array<Category>;
}

const PageIndex: NextPage<Props> = observer(({
  feeds,
  categories,
}) => {
  const classes = useStyles();
  const store = useStore();
  store.setFeeds(feeds);
  store.setCategory(categories);

  if (!store.category) {
    return null;
  }

  const { category } = store;

  const menuOnClick = (): void => {
    category.changeOpen(true);
  };

  return (
    <Box className={classes.root} display="flex" flexDirection="column" justifyContent="center">
      <Header position="static" menuOnClick={menuOnClick} />
      <Copy anchor="left" />
      <FeedList />
    </Box>
  );
});

PageIndex.getInitialProps = async (): Promise<Props> => {
  const feeds = await getPosts({ offset: 0, limit: 20 });
  const categories = await getAllCategories();

  return {
    feeds: feeds.data[0],
    categories: categories.data[0],
  };
};

export default PageIndex;
