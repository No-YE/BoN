import { types } from 'mobx-state-tree';

export default types
  .model({
    items: types.array(types.string),
  })
  .actions((self) => ({
    add(tag: string) {
      if (!self.items.includes(tag)) {
        self.items.push(tag);
      }
    },
    removeLast() {
      self.items.pop();
    },
    removeOne(tag: string) {
      self.items.splice(self.items.indexOf(tag), 1);
    }
  }));
