import { isLeft, left, Either, right } from '@lib/either';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';
import { CraetePostDto, UpdatePostDto, DeletePostDto } from '../dto/post.dto';

export function makePostService(postRepository: PostRepository) {
  return {
    createPost,
  };

  async function createPost(dto: CraetePostDto): Promise<Either<Error, Post>> {
    const createResult = await postRepository.createPost(undefined);
    
    if (isLeft(createResult)) {
      return left(createResult.value)
    }

    return right(createResult.value);
  }

  async function updatePost(dto: UpdatePostDto): Promise<Either<Error, boolean>> {
    const updateResult = await postRepository.updatePost(undefined);

    if (isLeft(updateResult)) {
      return left(updateResult.value);
    }

    return right(updateResult.value);
  }

  async function deletePost(dto: DeletePostDto): Promise<Either<Error, boolean>> {
    const deleteResult = await postRepository.deletePost(undefined);

    if (isLeft(deleteResult)) {
      return left(deleteResult.value);
    }

    return right(deleteResult.value);
  }
};
