import { Request, Response, NextFunction, Router } from 'express';
import { left, right, fold, chain, TaskEither } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import Joi from 'typesafe-joi';
import makeUserService from '~/application/service/user.service';
import { UserRepository } from '~/data/repository/user.repository';

function signinCallbackValidate<T>(obj: T): TaskEither<Error, { code: string; }> {
  const schema = Joi.object({
    code: Joi.string().required(),
  });

  type SchemaType = { code: string; };
  const result = schema.validate(obj);

  return result.error ? left<Error, SchemaType>(result.error) : right<Error, SchemaType>(result.value as SchemaType);
}

export default function makeUserController(userRepository: UserRepository) {
  const router = Router();
  const userService = makeUserService(userRepository);

  async function googleSignin(req: any, res: Response, next: NextFunction) {
    fold<Error, string, void>(
      (error) => of(next(error)),
      (url) => of(res.redirect(url)),
    )(userService.signin())();
  }

  async function googleSigninCallback(req: Request, res: Response, next: NextFunction) {
    pipe(
      signinCallbackValidate({ code: req.query.code }),
      chain((dto) => (userService.signinCallback(dto))),
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