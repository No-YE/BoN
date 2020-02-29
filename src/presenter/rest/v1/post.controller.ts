import {
  Request, Response, NextFunction, Router,
} from 'express';
import { fold, chain } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import * as validator from '../validator/post.validator';
import makePostService from '~/application/service/post.service';

export default function makeUserController(): Router {
  const router = Router();
  const postService = makePostService();

  function getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.getPostsValidate({
        take: req.body.offset,
        limit: req.body.limit,
      }),
      chain(postService.findNewPosts),
      fold(
        (error) => of(next(error)),
        (posts) => of(
          res.status(200).json(posts).end(),
        ),
      ),
    )();
  }

  function createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.createPostValidate({
        title: req.body.title,
        content: req.body.content,
        categoryNames: req.body.categoryNames,
        userId: req.session!.user!.id,
      }),
      chain(postService.createPost),
      fold(
        (error) => of(next(error)),
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_) => of(res.status(201).end()),
      ),
    )();
  }

  function updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.updatePostValidate({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        categoryNames: req.body.categoryNames,
      }),
      chain(postService.updatePost),
      fold(
        (error) => of(next(error)),
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_) => of(res.status(204).end()),
      ),
    )();
  }

  return router
    .get('/', getPosts)
    .post('/', createPost)
    .put('/:id', updatePost);
}
