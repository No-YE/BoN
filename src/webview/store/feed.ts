import { types } from 'mobx-state-tree';
import { categoryItem } from './category';

const feed = types
  .model({
    id: types.union(types.number, types.string),
    title: types.string,
    summary: types.string,
    mainImageUri: types.maybe(types.string),
    categories: types.array(categoryItem),
  });

export default types
  .model({
    items: types.array(feed),
  });
