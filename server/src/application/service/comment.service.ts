import {
  left, Either, right, match,
} from '@lib/either';
import { CommentRepository } from '~/data/repository/comment.repository';
import { Post, Comment } from '~/data/entity';
import {
  CreateCommentDto, UpdateCommentDto, DeleteCommentDto, FindCommentsDto,
} from '../dto/comment.dto';

export default function makeCommentService(commentRepository: CommentRepository) {
  async function createComment(dto: CreateCommentDto): Promise<Either<Error, Comment>> {
    const createResult = await commentRepository.createComment({ ...dto });

    return match<Either<Error, Comment>, Error, Comment>(
      createResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function updateComment(dto: UpdateCommentDto): Promise<Either<Error, boolean>> {
    const updateResult = await commentRepository.updateComment({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      updateResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function deleteComment(dto: DeleteCommentDto): Promise<Either<Error, boolean>> {
    const deleteResult = await commentRepository.deleteComment({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      deleteResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function findComments(dto: FindCommentsDto): Promise<Either<Error, Array<Comment>>> {
    const findResult = await commentRepository.findComments({ ...dto });

    return match<Either<Error, Array<Comment>>, Error, Array<Comment>>(
      findResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  return {
    createComment,
    updateComment,
    deleteComment,
  };
}
