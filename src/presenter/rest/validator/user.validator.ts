import Joi from 'typesafe-joi';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import validate from './validate';

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
