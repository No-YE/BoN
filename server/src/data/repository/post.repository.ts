import { Post } from '../entity';
import { Either } from '@lib/either';

export type PostRepository = {
  readonly createPost: (post: {
    title: string,
    content: string,
    userId: string | number,
  }) => Promise<Either<Error, Post>>;
  readonly updatePost: (post: {
    title: string,
    content: string,
  }) => Promise<Either<Error, boolean>>;
  readonly deletePost: (post: {
    id: string | number,
  }) => Promise<Either<Error, boolean>>;
}
