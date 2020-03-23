import Joi from 'typesafe-joi';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import validate from './validate';
import { UserRole } from '~/type';

type SigninCallbackSchema = {
  code: string;
};

//eslint-disable-next-line import/prefer-default-export
export function signinCallbackValidate(
  obj: { [key in keyof SigninCallbackSchema]: unknown },
): TaskEither<Error, SigninCallbackSchema> {
  const schema = Joi.object({
    code: Joi.string().required(),
  });

  return validate<SigninCallbackSchema>(schema, obj);
}

type MakeTokenSchema = {
  id: number;
  role: UserRole;
};

export function makeTokenValidate(
  obj: { [key in keyof MakeTokenSchema]: unknown },
): TaskEither<Error, MakeTokenSchema> {
  const schema = Joi.object({
    id: Joi.number().min(0).required(),
    role: Joi.string().valid('admin', 'operator', 'noRole').required(),
  });

  return validate<MakeTokenSchema>(schema, obj);
}
