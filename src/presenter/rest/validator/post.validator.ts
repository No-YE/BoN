import { TaskEither, left, right } from 'fp-ts/lib/TaskEither';
import Joi from 'typesafe-joi';

type GetRecentPostsSchema = {
  skip: number;
  take: number;
};

export function getRecentPostsValidate(
  obj: { [key in keyof GetRecentPostsSchema]: unknown },
): TaskEither<Error, GetRecentPostsSchema> {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0).default(0),
    take: Joi.number().integer().min(0).max(100)
      .default(20),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as GetRecentPostsSchema);
}

type GetPostsByCategorySchema = {
  take: number;
  limit: number;
  categoryId: number;
};

export function GetPostsByCategoryValidate(
  obj: { [key in keyof GetPostsByCategorySchema]: unknown },
): TaskEither<Error, GetPostsByCategorySchema> {
  const schema = Joi.object({
    take: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(0).max(100)
      .default(20),
    categoryId: Joi.number().integer().min(0).required(),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as GetPostsByCategorySchema);
}

type SearchPostsSchema = {
  take: number;
  limit: number;
  query: string;
};

export function SearchPostsValidate(
  obj: { [key in keyof SearchPostsSchema]: unknown },
): TaskEither<Error, SearchPostsSchema> {
  const schema = Joi.object({
    take: Joi.number().integer().min(0).default(0),
    limit: Joi.number().integer().min(0).max(100)
      .default(20),
    query: Joi.string().min(1).max(30).required(),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as SearchPostsSchema);
}

type GetPostByIdSchema = {
  id: number;
};

export function getPostByIdValidate(
  obj: { [key in keyof GetPostByIdSchema]: unknown },
): TaskEither<Error, GetPostByIdSchema> {
  const schema = Joi.object({
    id: Joi.number().integer().min(0).required(),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as GetPostByIdSchema);
}

type CreatePostSchema = {
  title: string;
  content: string;
  categoryNames: Array<string>;
  thumbnail?: string;
  userId: number;
};

export function createPostValidate(
  obj: { [key in keyof CreatePostSchema]: unknown },
): TaskEither<Error, CreatePostSchema> {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    categoryNames: Joi.array().items(Joi.string()),
    thumbnail: Joi.string().uri(),
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

export function updatePostValidate(
  obj: { [key in keyof UpdatePostSchema]: unknown },
): TaskEither<Error, UpdatePostSchema> {
  const schema = Joi.object({
    id: Joi.number().integer().min(0),
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    categoryNames: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(obj);

  return result.error ? left(result.error) : right(result.value as UpdatePostSchema);
}
