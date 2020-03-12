import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Router from 'next/router';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '4vh',
    right: '4vh',
  },
});

const Float: React.FC = () => {
  const classes = useStyles();

  const onClick = (): void => {
    Router.push('/write-post');
  };

  return (
    <Fab className={classes.root}>
      <EditIcon color="primary" aria-label="edit" onClick={onClick} />
    </Fab>
  );
};

export default Float;
