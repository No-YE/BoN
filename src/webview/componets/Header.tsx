import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton, Typography, Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LineInput from './LineInput';


const styles = createStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '1%',
    paddingRight: '9%',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '15%',
  },
});

interface Props extends WithStyles<typeof styles> {
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
  menuOnClick?: () => void;
}

const Header: React.FC<Props> = ({
  classes,
  menuOnClick = (): void => {},
  position = 'static',
}) => (
  <Box width="100%">
    <AppBar position={position} color="inherit">
      <Toolbar variant="regular" className={classes.root}>
        <div className={classes.title}>
          <IconButton onClick={menuOnClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Bon
          </Typography>
        </div>
        <LineInput placeholder="Search" />
      </Toolbar>
    </AppBar>
  </Box>
);

export default withStyles(styles)(Header);
