import { Post } from '../entity';
import { Either } from '@lib/either';

export type PostRepository = {
  readonly createPost: (post: Post) => Promise<Either<Error, Post>>;
  readonly updatePost: (post: Post) => Promise<Either<Error, boolean>>;
}
