import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DrawerItem from './CategoryItem';
import { useStore } from '../store';

const drawWidth = 240;

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
  },
  drawerRightHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

interface Props extends WithStyles<typeof styles> {
  open?: boolean;
  anchor?: 'right' | 'left';
  variant?: 'permanent' | 'persistent' | 'temporary';
}

const Copy: React.FC<Props> = ({
  classes,
  open = true,
  variant = 'persistent',
  anchor = 'right',
}) => {
  const store = useStore();

  if (!store?.categories) {
    return null;
  }

  return (
    <Drawer
      className={classes.root}
      open={open}
      variant={variant}
      anchor={anchor}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {anchor === 'left'
        ? (
          <div className={classes.drawerLeftHeader}>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </div>
        )
        : (
          <div className={classes.drawerRightHeader}>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        )}
      <Divider />
      <List>
        {store.categories.map((draw) => (
          <DrawerItem
            category={draw}
            key={draw.id}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(Copy);
