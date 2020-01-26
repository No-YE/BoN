import { isLeft, left, Either, right } from '@lib/either';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';

export function makePostService(postRepository: PostRepository) {
  return {
    createPost,
  };

  async function createPost(post: Post): Promise<Either<Error, Post>> {
    const createResult = await postRepository.createPost(post);
    
    if (isLeft(createResult)) {
      return left(createResult.value)
    }

    return right(createResult.value);
  }

  async function updatePost(post: Post): Promise<Either<Error, boolean>> {
    const updateResult = await postRepository.updatePost(post);

    if (isLeft(updateResult)) {
      return left(updateResult.value);
    }

    return right(updateResult.value);
  }
};
