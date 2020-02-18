import {
  Request, Response, NextFunction, Router,
} from 'express';
import { fold, chain } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import { getPostsValidate } from '../validator/post.validator';
import makePostService from '~/application/service/post.service';
import { PostRepository } from '~/data/repository/post.repository';

export default function makeUserController(postRepository: PostRepository): Router {
  const router = Router();
  const postService = makePostService(postRepository);

  function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      getPostsValidate({
        offset: req.body.offset,
        limit: req.body.limit,
      }),
      chain((dto) => postService.findNewPosts(dto)),
      fold(
        (error) => of(next(error)),
        (posts) => of(
          res.status(200).json(posts).end(),
        ),
      ),
    )();
  }

  return router.get('/', getPosts);
}
