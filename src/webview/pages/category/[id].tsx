import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import CategoryList from '../../componets/CategoryList';
import Header from '../../componets/Header';
import { useStore } from '../../store';
import FeedList from '../../componets/FeedList';
import { Feed, Category } from '../../type';
import { getPostByCategory, getAllCategories } from '../../lib/api/post';

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'center',
  },
});

interface Props {
  categories: Array<Category>;
  feedsCount: number;
  feeds: Array<Feed>;
  currentPage: number;
  id: string;
}

const PageCategory: NextPage<Props> = ({
  categories,
  feedsCount,
  feeds,
  currentPage,
  id,
}) => {
  const classes = useStyles();
  const store = useStore();
  store.setCategory(categories);
  store.setFeeds(feeds);

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
      <FeedList count={feedsCount} page={`/category/${id}`} currentPage={currentPage} />
    </Box>
  );
};

PageCategory.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const offset = Number(ctx.query.offset ?? 0);
  const limit = Number(ctx.query.limit ?? 10);
  const feeds = await getPostByCategory({ offset, limit }, Number(ctx.query.id));
  const categories = await getAllCategories();

  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  return {
    feeds: feeds.data[0],
    feedsCount: feeds.data[1],
    categories: categories.data[0],
    currentPage: Math.ceil(offset / limit) + 1,
    id: ctx.query.id as string,
  };
};

export default PageCategory;
