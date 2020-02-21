import to from 'await-to-js';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Either, left, right } from 'fp-ts/lib/Either';
import { Sequelize } from 'sequelize/types';
import { PostRepository } from '~/data/repository/post.repository';
import { Post } from '~/data/entity';
import { PostModelStatic } from '../model/post.model';
import { CategoryModelStatic } from '../model/category.model';

export default (
  sequelize: Sequelize,
  PostModel: PostModelStatic,
  CategoryModel: CategoryModelStatic,
): PostRepository => {
  function createPost(
    post: {
      title: string;
      content: string;
      userId: string | number;
    },
    category: {
      name: string;
    },
  ): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const t = await sequelize.transaction();

      const [categoryErr, categoryResult] = await to(CategoryModel.findOrCreate({
        where: { ...category },
        transaction: t,
      }));

      if (categoryErr) {
        await t.rollback();
        return left<Error, null>(categoryErr);
      }

      const [err] = await to(PostModel.create({ ...post }));
      return err ? left(err) : right(null);
    };
  }

  function updatePost(post: {
    id: string | number;
    title: string;
    content: string;
  }): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const [err] = await to(PostModel.update(
        { ...post },
        { where: { id: post.id } },
      ));
      return err ? left(err) : right(null);
    };
  }

  function deletePost(post: {
    id: string | number;
  }): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const [err] = await to(PostModel.update(
        { isActive: false },
        { where: { id: post.id } },
      ));
      return err ? left(err) : right(null);
    };
  }

  function searchPosts(posts: {
    offset: number;
    limit: number;
    query: string;
  }): TaskEither<Error, [Array<Post>, number]> {
    return async (): Promise<Either<Error, [Array<Post>, number]>> => {
      const [err, result] = await to(PostModel.findAndCountAll({
        offset: posts.offset,
        limit: posts.limit,
      }));

      return err || !result ? left(err) : right([result.rows, result.count]);
    };
  }

  function findNewPosts(posts: {
    offset: number;
    limit: number;
  }): TaskEither<Error, [Array<Post>, number]> {
    return async (): Promise<Either<Error, [Array<Post>, number]>> => {
      const [err, result] = await to(PostModel.findAndCountAll({
        offset: posts.offset,
        limit: posts.limit,
      }));
      console.log(result);

      return err || !result ? left(err) : right([result.rows, result.count]);
    };
  }

  function findPostsByCategory(post: {
    offset: number;
    limit: number;
    categoryId: string | number;
  }): TaskEither<Error, [Array<Post>, number]> {
    return async (): Promise<Either<Error, [Array<Post>, number]>> => {
      const [err, result] = await to(PostModel.findAndCountAll({
        offset: post.offset,
        limit: post.limit,
      }));

      return err || !result ? left(err) : right([result.rows, result.count]);
    };
  }

  function findPost(post: {
    id: string | number;
  }): TaskEither<Error, Post> {
    return async (): Promise<Either<Error, Post>> => {
      const [err, result] = await to(PostModel.findByPk(post.id));
      return err || !result ? left(err) : right(result);
    };
  }

  return {
    createPost,
    deletePost,
    findNewPosts,
    findPost,
    findPostsByCategory,
    searchPosts,
    updatePost,
  };
};
