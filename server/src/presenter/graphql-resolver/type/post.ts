import { objectType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  description: '게시글',
  definition(t) {
    t.id('id', { description: '고유 id' });
  },
});