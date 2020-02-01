import {
  isLeft, left, Either, right,
} from '@lib/either';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';
import {
  CraetePostDto, UpdatePostDto, DeletePostDto, findPostsDto, findPostDto,
} from '../dto/post.dto';

export default function makePostService(postRepository: PostRepository) {
  async function createPost(dto: CraetePostDto): Promise<Either<Error, Post>> {
    const createResult = await postRepository.createPost({ ...dto });

    if (isLeft(createResult)) {
      return left(createResult.value);
    }

    return right(createResult.value);
  }

  async function updatePost(dto: UpdatePostDto): Promise<Either<Error, boolean>> {
    const updateResult = await postRepository.updatePost({ ...dto });

    if (isLeft(updateResult)) {
      return left(updateResult.value);
    }

    return right(updateResult.value);
  }

  async function deletePost(dto: DeletePostDto): Promise<Either<Error, boolean>> {
    const deleteResult = await postRepository.deletePost({ ...dto });

    if (isLeft(deleteResult)) {
      return left(deleteResult.value);
    }

    return right(deleteResult.value);
  }

  async function findPosts(dto: findPostsDto): Promise<Either<Error, [Array<Post>, number]>> {
    const findResult = await postRepository.findPosts({ ...dto });

    if (isLeft(findResult)) {
      return left(findResult.value);
    }

    return right(findResult.value);
  }

  async function findPost(dto: findPostDto): Promise<Either<Error, Post>> {
    const findResult = await postRepository.findPost({ ...dto });

    if (isLeft(findResult)) {
      return left(findResult.value);
    }

    return right(findResult.value);
  }

  return {
    createPost,
    updatePost,
    deletePost,
    findPosts,
    findPost,
  };
}
