import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Post } from '../entity';

export type PostRepository = {
  readonly createPost: (post: {
    title: string;
    content: string;
    userId: string | number;
  }) => TaskEither<Error, Post>;

  readonly updatePost: (post: {
    title: string;
    content: string;
  }) => TaskEither<Error, boolean>;

  readonly deletePost: (post: {
    id: string | number;
  }) => TaskEither<Error, boolean>;

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
    offset: number,
    limit: number,
    categoryId: string | number;
  }) => TaskEither<Error, [Array<Post>, number]>;

  readonly findPost: (post: {
    id: string | number;
  }) => TaskEither<Error, Post>;
};
