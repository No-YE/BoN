import {
  Request, Response, NextFunction, Router,
} from 'express';
import asyncHandler from 'express-async-handler';
import { fold, chain, fromEither } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import * as validator from '../validator/post.validator';
import makePostService from '~/application/service/post.service';
import authenticate from '~/presenter/rest/middleware/authenticate.middleware';

export default function makePostController(): Router {
  const router = Router();
  const postService = makePostService();

  function getRecentPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.getRecentPostsValidate({
        skip: req.query.offset,
        take: req.query.limit,
      }),
      fromEither,
      chain(postService.findNewPosts),
      fold(
        (error) => of(next(error)),
        (posts) => of(
          res.status(200).json(posts).end(),
        ),
      ),
    )();
  }

  function getPostsByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.GetPostsByCategoryValidate({
        skip: req.query.offset,
        take: req.query.limit,
        categoryId: req.params.categoryId,
      }),
      fromEither,
      chain(postService.findByCategory),
      fold(
        (error) => of(next(error)),
        (posts) => of(res.status(200).json(posts).end()),
      ),
    )();
  }

  function searchPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.SearchPostsValidate({
        skip: req.query.offset,
        take: req.query.limit,
        query: req.query.q,
      }),
      fromEither,
      chain(postService.searchPosts),
      fold(
        (error) => of(next(error)),
        (posts) => of(res.status(200).json(posts).end()),
      ),
    )();
  }

  function getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.getPostByIdValidate({ id: req.params.id, userRole: req.session?.user?.role }),
      fromEither,
      chain(postService.findPost),
      fold(
        (error) => of(next(error)),
        (post) => of(res.status(200).json(post).end()),
      ),
    )();
  }

  function createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.createPostValidate({
        title: req.body.title,
        content: req.body.content,
        categoryNames: req.body.categoryNames,
        thumbnail: req.body.thumbnail,
        userId: req.user?.id,
      }),
      fromEither,
      chain(postService.createPost),
      fold(
        (error) => of(next(error)),
        () => of(res.status(201).end()),
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
        thumbnail: req.body.thumbnail,
      }),
      fromEither,
      chain(postService.updatePost),
      fold(
        (error) => of(next(error)),
        () => of(res.status(201).end()),
      ),
    )();
  }

  function deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.deletePostValidate({ id: req.params.id }),
      fromEither,
      chain(postService.deletePost),
      fold(
        (error) => of(next(error)),
        () => of(res.status(204).end()),
      ),
    )();
  }

  return router
    .get('/search', asyncHandler(searchPosts))
    .get('/', asyncHandler(getRecentPosts))
    .get('/:id', asyncHandler(getPostById))
    .post('/', authenticate, asyncHandler(createPost))
    .put('/:id', authenticate, asyncHandler(updatePost))
    .delete('/:id', authenticate, asyncHandler(deletePost))
    .get('/category/:categoryId', asyncHandler(getPostsByCategory));
}
