import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import { Box, Divider } from '@material-ui/core';
import { useStore } from '../store';
import FeedItem from './FeedItem';
import PaginationBar from './Pagination';

const styles = createStyles({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: '3%',
    marginBottom: '3%',
    width: '100%',
    maxWidth: 800,
  },
  pagination: {
    marginTop: '2%',
  },
});

interface Props extends WithStyles<typeof styles> {
  page: string;
  count: number;
  currentPage: number;
}

const FeedList: React.FC<Props> = observer<Props>(({
  classes,
  page,
  count,
  currentPage,
}) => {
  const store = useStore();

  if (!store.feed) {
    return null;
  }

  const { feed } = store;

  return (
    <Box className={classes.root} display="flex" flexDirection="column">
      {feed.items.map((item) => (
        <>
          <FeedItem
            key={item.id}
            id={item.id}
            summary={item.summary}
            title={item.title}
            thumbnail={item.thumbnail}
            createdAt={item.createdAt}
            categories={item.categories}
          />
          <Divider />
        </>
      ))}
      <Box className={classes.pagination} display="flex" justifyContent="center">
        <PaginationBar page={page} count={count} currentPage={currentPage} />
      </Box>
    </Box>
  );
});

export default withStyles(styles)(FeedList);
