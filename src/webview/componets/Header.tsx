/*eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
/*eslint-disable jsx-a11y/click-events-have-key-events*/
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, IconButton, Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LineInput from './LineInput';
import logo from '../public/static/logo.png';

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '50%',
  },
  logo: {
    width: 150,
    marginLeft: '3%',
    cursor: 'pointer',
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
}) => {
  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = (): void => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []);

  const logoOnClick = (): void => {
    Router.push('/');
  };

  return (
    <Box width="100%">
      <AppBar position={position} color="inherit">
        <Toolbar variant="regular" className={classes.root}>
          <Box className={classes.title}>
            <IconButton onClick={menuOnClick}>
              <MenuIcon />
            </IconButton>
            <img alt="" src={logo} className={classes.logo} onClick={logoOnClick} />
          </Box>
          {windowWidth >= 530
            ? <LineInput placeholder="Search" />
            : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withStyles(styles)(Header);
