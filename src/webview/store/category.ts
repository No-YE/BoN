import { types } from 'mobx-state-tree';

const categoryItem = types
  .model({
    id: types.union(types.number, types.string),
    name: types.string,
  });

export default types
  .model({
    isOpen: types.boolean,
    items: types.array(categoryItem),
  })
  .actions((self) => ({
    changeOpen(isOpen: boolean) {
      self.isOpen = isOpen;
    },
  }));
