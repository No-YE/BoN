import React from 'react';
import {
  Box, Chip, createStyles, WithStyles, withStyles,
} from '@material-ui/core';
import Router from 'next/router';
import { Category } from '../type';
import { useStore } from '../store';

const styles = createStyles({
  chip: {
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
  },
});

interface Props extends WithStyles<typeof styles> {
  categories: Array<Category>;
}

const CategoryTag: React.FC<Props> = ({
  classes,
  categories,
}) => {
  const store = useStore();

  const chipOnClick = (categoryId: string | number) => (): void => {
    store.category?.changeOpen(false);
    Router.push(`/category/${categoryId}`);
  };

  return (
    <Box>
      {categories.map((category) => (
        <Chip
          className={classes.chip}
          key={category.id}
          label={category.name}
          size="small"
          clickable
          color="primary"
          onClick={chipOnClick(category.id)}
        />
      ))}
    </Box>
  );
};

export default withStyles(styles)(CategoryTag);
