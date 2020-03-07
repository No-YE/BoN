import {
  Router, Request, Response, NextFunction,
} from 'express';
import asyncHandler from 'express-async-handler';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import makePostService from '~/application/service/post.service';

export default function makeCategoryController(): Router {
  const router = Router();
  const postService = makePostService();

  function getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      postService.findAllCategories(),
      fold(
        (error) => of(next(error)),
        (categories) => of(res.status(200).json(categories).end()),
      ),
    )();
  }

  return router
    .get('/', asyncHandler(getAllCategories));
}
