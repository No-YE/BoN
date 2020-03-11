import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import removeMd from 'remove-markdown';
import CategoryList from '../../componets/CategoryList';
import Header from '../../componets/Header';
import { useStore } from '../../store';
import FeedList from '../../componets/FeedList';
import { Feed } from '../../type';
import { getPostByCategory } from '../../lib/api/post';

const styles = createStyles({
  root: {
    width: '100%',
    alignItems: 'center',
  },
});

type Props = WithStyles<typeof styles>;

const PageCategory: React.FC<Props> = observer(({
  classes,
}) => {
  const [feed, setFeed] = useState<Array<Feed>>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const store = useStore();
  const categoryId = router.query.id as string;

  if (!store.category) {
    return null;
  }
  const { category } = store;

  const menuOnClick = (): void => {
    category.changeOpen(true);
  };

  const getPost = async (): Promise<void> => {
    const res = await getPostByCategory({ offset: 0, limit: 10 }, Number(categoryId));
    res.data[0].forEach((data: { content: string }, i: number) => {
      res.data[0][i].summary = removeMd(data.content.substring(0, 300));
    });
    setFeed(res.data[0]);
    setLoading(false);
  };

  useEffect((): void => {
    getPost();
  }, []);

  return (
    <Box className={classes.root} display="flex" flexDirection="column" justifyContent="center">
      <Header position="static" menuOnClick={menuOnClick} />
      <CategoryList anchor="left" />
      {!isLoading
        ? <FeedList feedProps={{ items: feed }} />
        : <CircularProgress className="progress-bar" />}
    </Box>
  );
});

export default withStyles(styles)(PageCategory);
