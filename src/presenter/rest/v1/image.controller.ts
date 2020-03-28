import {
  Router, Request, Response, NextFunction,
} from 'express';
import asyncHandler from 'express-async-handler';
import { chain, fold } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { of } from 'fp-ts/lib/Task';
import * as validator from '../validator/image.validator';
import makeImageService from '~/application/service/image.service';
import authenticateMiddleware from '~/presenter/rest/middleware/authenticate.middleware';

export default function makeImageController(): Router {
  const router = Router();
  const imageService = makeImageService();

  function createImage(req: Request, res: Response, next: NextFunction): Promise<void> {
    return pipe(
      validator.createImageValidate({
        filename: req.query.filename,
        kind: req.query.kind,
        userId: req.user?.id,
      }),
      chain(imageService.createPresignedUrl),
      fold(
        (error) => of(next(error)),
        (info) => of(res.status(200).json(info).end()),
      ),
    )();
  }

  return router
    .get('/', authenticateMiddleware, asyncHandler(createImage));
}
