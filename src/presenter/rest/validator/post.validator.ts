import { TaskEither } from 'fp-ts/lib/TaskEither';
import Joi from 'typesafe-joi';
import validate from './validate';

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

  validate(schema, obj);
}

type GetPostsByCategorySchema = {
  take: number;
  skip: number;
  categoryId: number;
};

export function GetPostsByCategoryValidate(
  obj: { [key in keyof GetPostsByCategorySchema]: unknown },
): TaskEither<Error, GetPostsByCategorySchema> {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0).default(0),
    take: Joi.number().integer().min(0).max(100)
      .default(20),
    categoryId: Joi.number().integer().min(0).required(),
  });

  validate(schema, obj);
}

type SearchPostsSchema = {
  take: number;
  skip: number;
  query: string;
};

export function SearchPostsValidate(
  obj: { [key in keyof SearchPostsSchema]: unknown },
): TaskEither<Error, SearchPostsSchema> {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0).default(0),
    take: Joi.number().integer().min(0).max(100)
      .default(20),
    query: Joi.string().min(1).max(30).required(),
  });

  validate(schema, obj);
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

  validate(schema, obj);
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

  validate(schema, obj);
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

  validate(schema, obj);
}
