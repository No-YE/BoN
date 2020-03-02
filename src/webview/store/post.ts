/*eslint-disable no-param-reassign*/
import { types } from 'mobx-state-tree';

export default types
  .model({
    title: types.string,
    content: types.string,
    tags: types.array(types.string),
  })
  .actions((self) => ({
    setTitle(title: string): void {
      self.title = title;
    },
    setContent(content: string): void {
      self.content = content;
    },
    addTag(tag: string): void {
      if (!self.tags.includes(tag)) {
        self.tags.push(tag);
      }
    },
    removeLastTag(): void {
      self.tags.pop();
    },
    removeOneTag(tag: string): void {
      self.tags.splice(self.tags.indexOf(tag), 1);
    },
  }));
