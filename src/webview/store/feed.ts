import { types } from 'mobx-state-tree';

const feed = types
  .model({
    id: types.union(types.number, types.string),
    title: types.string,
    summary: types.string,
    mainImageUri: types.maybe(types.string),
  });

export default types
  .model({
    items: types.array(feed),
  });
