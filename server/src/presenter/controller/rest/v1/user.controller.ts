import { Request, Response, NextFunction, Router } from 'express';
import { left, right, fold, Either } from 'fp-ts/lib/Either';
import Joi from 'typesafe-joi';
import makeUserService from '~/application/service/user.service';
import { UserRepository } from '~/data/repository/user.repository';

function signinCallbackValidate<T>(obj: T): Either<Error, { code: string; }> {
  const schema = Joi.object({
    code: Joi.string().required(),
  });

  type SchemaType = {
    code: string;
  };
  const result = schema.validate(obj);

  return result.error ? left<Error, SchemaType>(result.error) : right<Error, SchemaType>(result.value as SchemaType);
}

export default function makeUserController(router: Router, userRepository: UserRepository) {
  const userService = makeUserService(userRepository);

  async function googleSignin(req, res: Response, next: NextFunction) {
    return fold<Error, string, void>(
      (error) => next(error),
      (url) => res.redirect(url),
    )(await userService.signin()());
  }

  async function googleSigninCallback(req: Request, res: Response, next: NextFunction) {
  }

  return router.get('/google', googleSignin)
}