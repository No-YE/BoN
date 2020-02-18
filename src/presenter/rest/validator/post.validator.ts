import { TaskEither, left, right } from 'fp-ts/lib/TaskEither';
import Joi from 'typesafe-joi';

type GetPostsSchema = {
  offset: number;
  limit: number;
};

//eslint-disable-next-line import/prefer-default-export
export function getPostsValidate<T>(obj: T): TaskEither<Error, GetPostsSchema> {
  const schema = Joi.object({
    offset: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(0).max(100)
      .default(20),
  });

  const result = schema.validate(obj);
  console.log(result);

  return result.error ? left(result.error) : right(result.value as GetPostsSchema);
}
