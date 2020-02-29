import { TaskEither, left, right } from 'fp-ts/lib/TaskEither';
import Joi from 'typesafe-joi';

type GetPostsSchema = {
  take: number;
  limit: number;
};

export function getPostsValidate<T>(obj: T): TaskEither<Error, GetPostsSchema> {
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

export function createPostValidate<T>(obj: T): TaskEither<Error, CreatePostSchema> {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    categoryNames: Joi.array().items(Joi.string()),
    userId: Joi.number(),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as CreatePostSchema);
}

type UpdatePostSchema = {
  id: number;
  title: string;
  content: string;
  categoryNames: Array<string>;
};

export function updatePostValidate<T>(obj: T): TaskEither<Error, UpdatePostSchema> {
  const schema = Joi.object({
    id: Joi.number().integer().min(0),
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    categoryNames: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as UpdatePostSchema);
}
