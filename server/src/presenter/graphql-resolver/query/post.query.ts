import { queryField, arg, inputObjectType } from 'nexus';

export const PostsWhereInput = inputObjectType({
  name: 'PostsWhereInput',
  definition(t) {
    t.int('offset', {
      required: false,
      default: 0,
    });
    t.int('limit', {
      required: false,
      default: 20,
    });
  },
})

export const QueryFiledPosts = queryField('posts', {
  type: 'Post',
  description: '조건에 일치하는 Post들을 가져옵니다.',
  nullable: true,
  args: {
    where: arg({
      type: PostsWhereInput,
      required: false,
    }),
  },
  resolve(_parent, args, { loader }) {
    
    return {
      id: '123'
    }
  },
})