import { types } from 'mobx-state-tree';

const category = types
  .model({
    id: types.integer,
    name: types.string,
  });

const feed = types
  .model({
    id: types.number,
    title: types.string,
    summary: types.string,
    createdAt: types.Date,
    thumbnail: types.maybeNull(types.string),
    categories: types.array(category),
  });

export default types
  .model({
    items: types.array(feed),
  });
