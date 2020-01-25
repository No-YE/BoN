import { Post } from '../entity';
import { Either } from 'fp-ts/lib/Either';

export type PostRepository = {
  readonly createPost: (post: Post) => Promise<Either<Error, Post>>;
}
