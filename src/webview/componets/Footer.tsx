import React from 'react';
import { makeStyles, Box, Link } from '@material-ui/core';
import { GitHub, Email } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '9vh',
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    bottom: 0,
  },
  icon: {
    marginLeft: 20,
  },
});

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} display="flex" alignItems="center" justifyContent="center">
      © NoYE • 2020
      <Link href="https://github.com/No-YE" className={classes.icon}><GitHub color="action" /></Link>
      <Link href="mailto:nye5620@gmail.com" className={classes.icon}><Email color="action" /></Link>
    </Box>
  );
};

export default Footer;
