import React from 'react';
import Router from 'next/router';
import queryString from 'query-string';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '& > *': {
      marginTop: 10,
    },
  },
});

interface Props {
  page: string;
  count: number;
}

const PaginationBar: React.FC<Props> = ({
  page,
  count,
}) => {
  const classes = useStyles();

  const onChange = (): void => {
    const limit = 10;
    const offset = count * limit;
    const query = queryString.stringify({ offset, limit });
    Router.push(`/${page}?${query}`);
  };

  return (
    <Pagination count={count} color="primary" className={classes.root} onChange={onChange} />
  );
};

export default PaginationBar;
