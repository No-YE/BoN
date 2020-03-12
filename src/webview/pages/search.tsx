import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import CategoryList from '../componets/CategoryList';
import Header from '../componets/Header';
import { useStore } from '../store';
import FeedList from '../componets/FeedList';
import { Feed, Category } from '../type';
import { searchPosts, getAllCategories } from '../lib/api/post';

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'center',
  },
});

interface Props {
  feeds: Array<Feed>;
  feedsCount: number;
  categories: Array<Category>;
}

const PageSearch: NextPage<Props> = observer(({
  categories,
  feedsCount,
  feeds,
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
      <CategoryList anchor="left" />
      <FeedList count={feedsCount} page="/search" />
    </Box>
  );
});

PageSearch.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const offset = Number(ctx.query.offset) ?? 0;
  const limit = Number(ctx.query.limit) ?? 10;
  const feeds = await searchPosts({ offset, limit, q: ctx.query.q as string });
  const categories = await getAllCategories();

  return {
    feeds: feeds.data[0],
    feedsCount: feeds.data[1],
    categories: categories.data[0],
  };
};

export default PageSearch;
