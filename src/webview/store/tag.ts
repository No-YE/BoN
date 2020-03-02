import { types } from 'mobx-state-tree';

export default types
  .model({
    items: types.array(types.string),
  })
  .actions((self) => ({
    add(tag: string): void {
      if (!self.items.includes(tag)) {
        self.items.push(tag);
      }
    },
    removeLast(): void {
      self.items.pop();
    },
    removeOne(tag: string): void {
      self.items.splice(self.items.indexOf(tag), 1);
    },
  }));
