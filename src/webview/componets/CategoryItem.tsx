import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Category } from '../type/Category';

interface Props {
  category: Category;
}

const DrawerItem: React.FC<Props> = ({
  category,
}) => (
  <ListItem button>
    <ListItemText primary={category.name} />
  </ListItem>
);

export default DrawerItem;
