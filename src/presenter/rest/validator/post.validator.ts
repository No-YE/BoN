import { TaskEither, left, right} from 'fp-ts/lib/TaskEither';
import Joi from 'typesafe-joi';

type GetPostsSchema = {
  offset: number;
  limit: number;
};

export function getPostsValidate<T>(obj: T): TaskEither<Error, GetPostsSchema> {
  const schema = Joi.object({
    offset: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(1).max(200),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as GetPostsSchema);
}
