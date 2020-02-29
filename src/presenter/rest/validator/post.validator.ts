import { TaskEither, left, right } from 'fp-ts/lib/TaskEither';
import Joi from 'typesafe-joi';

type GetPostsSchema = {
  take: number;
  limit: number;
};

export function getPostsValidate(obj: GetPostsSchema): TaskEither<Error, GetPostsSchema> {
  const schema = Joi.object({
    take: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(0).max(100)
      .default(20),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as GetPostsSchema);
}

type CreatePostSchema = {
  title: string;
  content: string;
  categoryNames: Array<string>;
  userId: number;
};

export function createPostValidate(obj: CreatePostSchema): TaskEither<Error, CreatePostSchema> {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    categoryNames: Joi.array().items(Joi.string()),
    userId: Joi.number(),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as CreatePostSchema);
}
