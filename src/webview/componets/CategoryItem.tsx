import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Category } from '../type/Category';

interface Props {
  category: Category;
  onClick: () => void;
}

const DrawerItem: React.FC<Props> = ({
  category,
  onClick,
}) => (
  <ListItem button>
    <ListItemText primary={category.name} onClick={onClick} />
  </ListItem>
);

export default DrawerItem;
