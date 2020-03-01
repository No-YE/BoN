import React from 'react';
import Link from 'next/link';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateIcon from '@material-ui/icons/Create';
import { observer } from 'mobx-react-lite';
import DrawerItem from './CategoryItem';
import { useStore } from '../store';

const drawWidth = 250;

const styles = createStyles({
  root: {
    display: 'flex',
    width: drawWidth,
  },
  drawerPaper: {
    width: drawWidth,
  },
  drawerLeftHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
  },
  drawerRightHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

interface Props extends WithStyles<typeof styles> {
  anchor?: 'right' | 'left';
  variant?: 'permanent' | 'persistent' | 'temporary';
}

const CategoryList: React.FC<Props> = observer<Props>(({
  classes,
  variant = 'persistent',
  anchor = 'right',
}) => {
  const store = useStore();

  if (!store.category) {
    return null;
  }

  const { category } = store;

  const closeOnClick = (): void => {
    category.changeOpen(false);
  };

  return (
    <Drawer
      className={classes.root}
      open={category.isOpen}
      variant={variant}
      anchor={anchor}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {anchor === 'left'
        ? (
          <div className={classes.drawerLeftHeader}>
            {store.user
              ? (
                <Link href="/write-post"><CreateIcon /></Link>
              )
              : null}
            <IconButton onClick={closeOnClick}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        )
        : (
          <div className={classes.drawerRightHeader}>
            <IconButton onClick={closeOnClick}>
              <ChevronRightIcon />
            </IconButton>
            {store.user
              ? (
                <Link href="/write-post"><CreateIcon /></Link>
              )
              : null}
          </div>
        )}
      <Divider />
      <List>
        {category.items.map((draw) => (
          <DrawerItem
            category={draw}
            key={draw.id}
          />
        ))}
      </List>
    </Drawer>
  );
});

export default withStyles(styles)(CategoryList);
