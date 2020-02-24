import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Post, Category } from '../entity';

export type PostRepository = {
  readonly createPost: (
    post: {
      title: string;
      content: string;
      userId: string | number;
    },
    categories: Array<{
      name: string;
    }>,
  ) => TaskEither<Error, null>;

  readonly updatePost: (post: {
    id: string | number;
    title: string;
    content: string;
  }) => TaskEither<Error, null>;

  readonly deletePost: (post: {
    id: string | number;
  }) => TaskEither<Error, null>;

  readonly searchPosts: (posts: {
    offset: number;
    limit: number;
    query: string;
  }) => TaskEither<Error, [Array<Post>, number]>;

  readonly findNewPosts: (posts: {
    offset: number;
    limit: number;
  }) => TaskEither<Error, [Array<Post>, number]>;

  readonly findPostsByCategory: (post: {
    offset: number;
    limit: number;
    categoryId: string | number;
  }) => TaskEither<Error, [Array<Post>, number]>;

  readonly findPost: (post: {
    id: string | number;
  }) => TaskEither<Error, Post>;
};
