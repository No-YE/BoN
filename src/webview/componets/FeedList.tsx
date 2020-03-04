import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react-lite';
import { Box, Divider } from '@material-ui/core';
import { useStore } from '../store';
import FeedItem from './FeedItem';

const styles = createStyles({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: '3%',
    width: '100%',
    maxWidth: 800,
  },
});

type Props = WithStyles<typeof styles>;

const FeedList: React.FC<Props> = observer<Props>(({
  classes,
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
            mainImageUri={item.mainImageUri}
            createdAt={item.createdAt}
            categories={item.categories}
          />
          <Divider />
        </>
      ))}
    </Box>
  );
});

export default withStyles(styles)(FeedList);
