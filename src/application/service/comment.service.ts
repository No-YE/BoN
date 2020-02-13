import { TaskEither } from 'fp-ts/lib/TaskEither';
import { CommentRepository } from '~/data/repository/comment.repository';
import { Comment } from '~/data/entity';
import {
  CreateCommentDto, UpdateCommentDto, DeleteCommentDto, FindCommentsDto,
} from '../dto/comment.dto';

export default function makeCommentService(commentRepository: CommentRepository) {
  function createComment(dto: CreateCommentDto): TaskEither<Error, Comment> {
    return commentRepository.createComment({ ...dto });
  }

  function updateComment(dto: UpdateCommentDto): TaskEither<Error, boolean> {
    return commentRepository.updateComment({ ...dto });
  }

  function deleteComment(dto: DeleteCommentDto): TaskEither<Error, boolean> {
    return commentRepository.deleteComment({ ...dto });
  }

  function findComments(dto: FindCommentsDto): TaskEither<Error, Array<Comment>> {
    return commentRepository.findComments({ ...dto });
  }

  return {
    createComment,
    updateComment,
    deleteComment,
    findComments,
  };
}
