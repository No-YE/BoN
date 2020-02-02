import {
  left, Either, right, match,
} from '@lib/either';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';
import {
  CraetePostDto, UpdatePostDto, DeletePostDto, findPostsDto, findPostDto,
} from '../dto/post.dto';

export default function makePostService(postRepository: PostRepository) {
  async function createPost(dto: CraetePostDto): Promise<Either<Error, Post>> {
    const createResult = await postRepository.createPost({ ...dto });

    return match<Either<Error, Post>, Error, Post>(
      createResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function updatePost(dto: UpdatePostDto): Promise<Either<Error, boolean>> {
    const updateResult = await postRepository.updatePost({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      updateResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function deletePost(dto: DeletePostDto): Promise<Either<Error, boolean>> {
    const deleteResult = await postRepository.deletePost({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      deleteResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function findPosts(dto: findPostsDto): Promise<Either<Error, [Array<Post>, number]>> {
    const findResult = await postRepository.findPosts({ ...dto });

    return match<Either<Error, [Array<Post>, number]>, Error, [Array<Post>, number]>(
      findResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function findPost(dto: findPostDto): Promise<Either<Error, Post>> {
    const findResult = await postRepository.findPost({ ...dto });

    return match<Either<Error, Post>, Error, Post>(
      findResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  return {
    createPost,
    updatePost,
    deletePost,
    findPosts,
    findPost,
  };
}
