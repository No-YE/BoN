import React from 'react';
import { observer } from 'mobx-react-lite';
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
  feeds: Array<Feed>;
}

const PageCategory: NextPage<Props> = observer(({
  categories,
  feeds,
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
      <FeedList />
    </Box>
  );
});

PageCategory.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const feeds = await getPostByCategory({ offset: 0, limit: 10 }, Number(ctx.query.id));
  const categories = await getAllCategories();

  return {
    feeds: feeds.data[0],
    categories: categories.data[0],
  };
};

export default PageCategory;
