import { queryField, arg, inputObjectType } from 'nexus';
import makePostService from '~/application/service/post.service';
import { PostRepository } from '~/data/repository/post.repository';

export default function makePostQueries(postRepository: PostRepository) {
  const postService = makePostService(postRepository);

  const PostsWhereInput = inputObjectType({
    name: 'PostsWhereInput',
    definition(t) {
      t.int('offset', {
        required: true,
        default: 0,
      });
      t.int('limit', {
        required: true,
        default: 20,
      });
    },
  });
  
  const QueryFiledPosts = queryField('posts', {
    type: 'Post',
    description: '조건에 일치하는 Post들을 가져옵니다.',
    nullable: true,
    args: {
      where: arg({
        type: PostsWhereInput,
        required: true,
      }),
    },
    resolve(_parent, args, { loader }) {
      postService.findNewPosts({ ...args.where! })
      
      return {
        id: '123'
      }
    },
  });

  return {
    PostsWhereInput,
    QueryFiledPosts,
  }
}