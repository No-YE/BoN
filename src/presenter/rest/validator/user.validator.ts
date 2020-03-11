import Joi from 'typesafe-joi';
import { left, right, TaskEither } from 'fp-ts/lib/TaskEither';

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

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as SigninCallbackSchema);
}
