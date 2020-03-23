import {
  Request, Response, NextFunction, Router,
} from 'express';
import asyncHandler from 'express-async-handler';
import { fold, chain } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import * as validator from '../validator/post.validator';
import makePostService from '~/application/service/post.service';
import authenticate from '~/lib/middleware/authenticate.middleware';

export default function makePostController(): Router {
  const router = Router();
  const postService = makePostService();

  function getRecentPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.getRecentPostsValidate({
        skip: req.query.offset,
        take: req.query.limit,
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

  function getPostsByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.GetPostsByCategoryValidate({
        skip: req.query.offset,
        take: req.query.limit,
        categoryId: req.params.categoryId,
      }),
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
        userId: req.session!.user!.id,
      }),
      chain(postService.createPost),
      fold(
        (error) => of(next(error)),
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
        thumbnail: req.body.thumbnail,
      }),
      chain(postService.updatePost),
      fold(
        (error) => of(next(error)),
        (_) => of(res.status(201).end()),
      ),
    )();
  }

  function deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.deletePostValidate({ id: req.params.id }),
      chain(postService.deletePost),
      fold(
        (error) => of(next(error)),
        (_) => of(res.status(204).end()),
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
