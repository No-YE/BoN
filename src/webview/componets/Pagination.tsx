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
  currentPage: number;
}

const PaginationBar: React.FC<Props> = ({
  page,
  count,
  currentPage,
}) => {
  const classes = useStyles();
  const limit = 10;
  const pageCount = Math.ceil(count / limit);

  const onChange = (e: React.ChangeEvent<unknown>, newPage: number): void => {
    const query = queryString.stringify({ offset: (newPage - 1) * limit, limit });
    Router.push(`${page}?${query}`);
  };

  return (
    <Pagination
      count={pageCount}
      defaultPage={currentPage}
      color="primary"
      className={classes.root}
      onChange={onChange}
    />
  );
};

export default PaginationBar;
