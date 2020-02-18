import React from 'react';
import { observer } from 'mobx-react-lite';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Copy from '../componets/CategoryList';
import Header from '../componets/Header';
import { useStore } from '../store';
import FeedList from '../componets/FeedList';

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
  const store = useStore();

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

export default withStyles(styles)(PageIndex);
