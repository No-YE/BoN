import {
  Request, Response, NextFunction, Router,
} from 'express';
import asyncHandler from 'express-async-handler';
import { fold, chain } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import makeUserService from '~/application/service/user.service';
import * as validator from '../validator/user.validator';
import authenticateMiddleware from '~/lib/middleware/authenticate.middleware';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makeUserController() {
  const router = Router();
  const userService = makeUserService();

  async function googleSignin(_req: Request, res: Response, next: NextFunction): Promise<void> {
    fold<Error, string, void>(
      (error) => of(next(error)),
      (url) => of(res.redirect(url)),
    )(userService.signin())();
  }

  async function googleSigninCallback(req: Request, res: Response, next: NextFunction): Promise<void> {
    pipe(
      validator.signinCallbackValidate({ code: req.query.code }),
      chain(userService.signinCallback),
      fold(
        (error) => of(next(error)),
        (user) => {
          req.session!.user = user;
          return of(res.redirect('/'));
        },
      ),
    )();
  }

  async function makeToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    pipe(
      validator.makeTokenValidate({
        id: req.user?.id,
        role: req.user?.role,
        email: req.user?.email,
      }),
      chain(userService.createToken),
      fold(
        (error) => of(next(error)),
        (token) => of(res.status(201).json({ token }).end()),
      ),
    )();
  }

  return router
    .get('/google', asyncHandler(googleSignin))
    .get('/google/callback', asyncHandler(googleSigninCallback))
    .get('/token', authenticateMiddleware, asyncHandler(makeToken));
}
