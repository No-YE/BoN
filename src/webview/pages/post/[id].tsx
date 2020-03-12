import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { NextPage, NextPageContext } from 'next';
import CategoryList from '../../componets/CategoryList';
import Header from '../../componets/Header';
import { useStore } from '../../store';
import MarkdownViewer from '../../componets/MarkdownViewer';
import PostHead from '../../componets/PostHead';
import { getPostById, getAllCategories } from '../../lib/api/post';
import { Category } from '~/webview/type';

const useStyles = makeStyles({
  root: {
    width: '100%',
    alignItems: 'center',
  },
});

interface Props {
  categories: Array<Category>;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
}

const PagePost: NextPage<Props> = ({
  categories,
  post,
}) => {
  const classes = useStyles();
  const store = useStore();
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
      <PostHead title={post.title} createdAt={post.createdAt} categories={post.categories} />
      <MarkdownViewer content={post.content} />
    </Box>
  );
};

PagePost.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const categories = await getAllCategories();
  const post = await getPostById(Number(ctx.query.id));

  return {
    categories: categories.data[0],
    post: post.data,
  };
};

export default PagePost;
