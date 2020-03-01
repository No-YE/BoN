import {
  Request, Response, NextFunction, Router,
} from 'express';
import {
  left, right, fold, chain, TaskEither,
} from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import Joi from 'typesafe-joi';
import makeUserService from '~/application/service/user.service';

function signinCallbackValidate<T>(obj: T): TaskEither<Error, { code: string }> {
  const schema = Joi.object({
    code: Joi.string().required(),
  });

  type SchemaType = { code: string };
  const result = schema.validate(obj);

  return result.error ? left<Error, SchemaType>(result.error) : right<Error, SchemaType>(result.value as SchemaType);
}

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
      signinCallbackValidate({ code: req.query.code }),
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

  return router.get('/google', googleSignin)
    .get('/google/callback', googleSigninCallback);
}
