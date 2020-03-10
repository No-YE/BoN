import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import CategoryList from '../../componets/CategoryList';
import Header from '../../componets/Header';
import { useStore } from '../../store';
import MarkdownViewer from '../../componets/MarkdownViewer';
import { getPostById } from '../../lib/api/post';

const styles = createStyles({
  root: {
    width: '100%',
    alignItems: 'center',
  },
});

type Props = WithStyles<typeof styles>;

const PageIndex: React.FC<Props> = observer(({
  classes,
}) => {
  const [post, setPost] = useState('');
  const router = useRouter();
  const store = useStore();

  if (!store.category) {
    return null;
  }
  const { category } = store;

  const menuOnClick = (): void => {
    category.changeOpen(true);
  };

  const getPost = async (): Promise<void> => {
    const res = await getPostById(Number(router.query.id));
    setPost(res.data.content);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Box className={classes.root} display="flex" flexDirection="column" justifyContent="center">
      <Header position="static" menuOnClick={menuOnClick} />
      <CategoryList anchor="left" />
      <MarkdownViewer content={post} />
    </Box>
  );
});

export default withStyles(styles)(PageIndex);
