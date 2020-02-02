import { Either } from '@lib/either';
import { Comment } from '../entity';

export type CommentRepository = {
  readonly createComment: (comment: {
    content: string;
    postId: string | number;
    userId: string | number;
  }) => Promise<Either<Error, Comment>>;

  readonly updateComment: (comment: {
    content: string;
    postId: string | number;
  }) => Promise<Either<Error, boolean>>;

  readonly deleteComment: (comment: {
    id: string | number;
    userId: string | number;
  }) => Promise<Either<Error, boolean>>;

  readonly findComments: (comment: {
    offset: number;
    limit: number;
  }) => Promise<Either<Error, Array<Comment>>>;
};
