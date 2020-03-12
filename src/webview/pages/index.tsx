import React from 'react';
import { NextPage, NextPageContext } from 'next';
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
  feedsCount: number;
  currentPage: number;
  categories: Array<Category>;
}

const PageIndex: NextPage<Props> = ({
  feeds,
  feedsCount,
  currentPage,
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
      <FeedList page="/" count={feedsCount} currentPage={currentPage} />
    </Box>
  );
};

PageIndex.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const offset = Number(ctx.query.offset ?? 0);
  const limit = Number(ctx.query.limit ?? 10);
  const feeds = await getPosts({ offset, limit });
  const categories = await getAllCategories();

  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return {
    feeds: feeds.data[0],
    feedsCount: feeds.data[1],
    currentPage: Math.ceil(offset / limit) + 1,
    categories: categories.data[0],
  };
};

export default PageIndex;
