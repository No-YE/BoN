/*eslint-disable no-param-reassign*/
import { types } from 'mobx-state-tree';

export default types
  .model({
    title: types.string,
    content: types.string,
  })
  .actions((self) => ({
    changeTitle(title: string): void {
      self.title = title;
    },
    changeContent(content: string): void {
      self.content = content;
    },
  }));
