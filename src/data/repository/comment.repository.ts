import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Comment } from '../entity';

export type CommentRepository = {
  readonly createComment: (comment: {
    content: string;
    postId: string | number;
    userId: string | number;
  }) => TaskEither<Error, Comment>;

  readonly updateComment: (comment: {
    content: string;
    postId: string | number;
  }) => TaskEither<Error, boolean>;

  readonly deleteComment: (comment: {
    id: string | number;
    userId: string | number;
  }) => TaskEither<Error, boolean>;

  readonly findComments: (comment: {
    offset: number;
    limit: number;
  }) => TaskEither<Error, Array<Comment>>;
};
