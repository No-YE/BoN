import { Either } from 'fp-ts/lib/Either';
import Joi from 'typesafe-joi';
import validate from '~/lib/validate';
import { UserRole } from '~/type';

type GetRecentPostsSchema = {
  skip: number;
  take: number;
};

export function getRecentPostsValidate(
  obj: { [key in keyof GetRecentPostsSchema]: unknown },
): Either<Error, GetRecentPostsSchema> {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0).default(0),
    take: Joi.number().integer().min(0).max(100)
      .default(20),
  });

  return validate<GetRecentPostsSchema>(schema, obj);
}

type GetPostsByCategorySchema = {
  take: number;
  skip: number;
  categoryId: number;
};

export function GetPostsByCategoryValidate(
  obj: { [key in keyof GetPostsByCategorySchema]: unknown },
): Either<Error, GetPostsByCategorySchema> {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0).default(0),
    take: Joi.number().integer().min(0).max(100)
      .default(20),
    categoryId: Joi.number().integer().min(0).required(),
  });

  return validate<GetPostsByCategorySchema>(schema, obj);
}

type SearchPostsSchema = {
  take: number;
  skip: number;
  query: string;
};

export function SearchPostsValidate(
  obj: { [key in keyof SearchPostsSchema]: unknown },
): Either<Error, SearchPostsSchema> {
  const schema = Joi.object({
    skip: Joi.number().integer().min(0).default(0),
    take: Joi.number().integer().min(0).max(100)
      .default(20),
    query: Joi.string().min(1).max(30).required(),
  });

  return validate<SearchPostsSchema>(schema, obj);
}

type GetPostByIdSchema = {
  id: number;
  userRole?: UserRole;
};

export function getPostByIdValidate(
  obj: { [key in keyof GetPostByIdSchema]: unknown },
): Either<Error, GetPostByIdSchema> {
  const schema = Joi.object({
    id: Joi.number().integer().min(0).required(),
    userRole: Joi.valid('admin', 'operator', 'noRole').optional(),
  });

  return validate<GetPostByIdSchema>(schema, obj);
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
): Either<Error, CreatePostSchema> {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    categoryNames: Joi.array().items(Joi.string()),
    thumbnail: Joi.string().uri(),
    userId: Joi.number(),
  });

  return validate<CreatePostSchema>(schema, obj);
}

type UpdatePostSchema = {
  id: number;
  title: string;
  content: string;
  categoryNames: Array<string>;
  thumbnail?: string;
  userId: number;
};

export function updatePostValidate(
  obj: { [key in keyof UpdatePostSchema]: unknown },
): Either<Error, UpdatePostSchema> {
  const schema = Joi.object({
    id: Joi.number().integer().min(0),
    title: Joi.string().min(1).max(255).required(),
    content: Joi.string().min(1).required(),
    categoryNames: Joi.array().items(Joi.string()),
    thumbnail: Joi.string().uri(),
    userId: Joi.number(),
  });

  return validate<UpdatePostSchema>(schema, obj);
}

type DeletePostSchema = {
  id: number;
};

export function deletePostValidate(
  obj: { [key in keyof DeletePostSchema]: unknown },
): Either<Error, DeletePostSchema> {
  const schema = Joi.object({
    id: Joi.number().min(0).required(),
  });

  return validate<DeletePostSchema>(schema, obj);
}
