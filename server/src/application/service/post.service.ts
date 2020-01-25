import { isLeft, left, Either, right } from 'fp-ts/lib/Either';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';

export function makePostService(postRepository: PostRepository) {
  return {
    createPost,
  };

  async function createPost(post: Post): Promise<Either<Error, Post>> {
    const createResult = await postRepository.createPost(post);
    
    if (isLeft(createResult)) {
      return left(createResult.left)
    }

    return right(createResult.right);
  }
};
