/*eslint-disable react/no-danger*/
import React from 'react';
import {
  withStyles, WithStyles, createStyles, Typography, Box,
} from '@material-ui/core';
import CategoryTag from './CategoryTag';
import dateFormat from '../lib/date-format';
import { Category } from '../type';

const styles = createStyles({
  root: {
    marginTop: '3%',
    width: '100%',
    maxWidth: 900,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: '1%',
  },
  title: {
    fontSize: '5vh',
    color: 'rgba(0, 0, 0, 0.8)',
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  createdAt: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: '2vh',
  },
});

interface Props extends WithStyles<typeof styles> {
  title?: string;
  createdAt?: string;
  categories?: Array<Category>;
}

const PostHead: React.FC<Props> = ({
  classes,
  title,
  createdAt,
  categories,
}) => (
  <Box display="flex" flexDirection="column" className={classes.root}>
    <Typography className={classes.title}>{title}</Typography>
    <CategoryTag categories={categories || []} />
    <Typography className={classes.createdAt}>{dateFormat(new Date(createdAt || ''))}</Typography>
  </Box>
);

export default withStyles(styles)(PostHead);
