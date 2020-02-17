import {
  Request, Response, NextFunction, Router,
} from 'express';
import { fold, chain } from 'fp-ts/lib/TaskEither';
import { of, Task } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import { getPostsValidate } from '../validator/post.validator';
import makePostService from '~/application/service/post.service';
import { PostRepository } from '~/data/repository/post.repository';

export default function makeUserController(postRepository: PostRepository): Router {
  const router = Router();
  const postService = makePostService(postRepository);

  function getPosts(req: Request, res: Response, next: NextFunction): Task<void> {
    const { offset, limit } = req.body;

    return pipe(
      getPostsValidate({ offset, limit }),
      chain((dto) => postService.findNewPosts(dto)),
      fold(
        (error) => of(next(error)),
        (posts) => of(
          res.status(200).json(posts).end(),
        ),
      ),
    );
  }

  return router.get('/', getPosts);
}
