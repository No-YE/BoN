import { getManager, EntityManager, Like } from 'typeorm';
import to from 'await-to-js';
import { left, right, Either } from 'fp-ts/lib/Either';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import Post, { Category } from '../aggregate/post';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const manager = getManager();

  function create(
    post: {
      title: string;
      content: string;
      userId: number;
      categories: Array<Category>;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const usingManager = transactionManager ?? manager;
      const newPost = Post.of(post);

      const [err] = await to(usingManager.save(newPost));
      return err ? left<Error, null>(err) : right<Error, null>(null);
    };
  }

  function update(
    post: {
      id: number;
      title: string;
      content: string;
      categories: Array<Category>;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const usingManager = transactionManager ?? manager;

      const [err] = await to(usingManager.update(Post, post.id, post));
      return err ? left<Error, null>(err) : right<Error, null>(null);
    };
  }

  function remove(id: number, transactionManager?: EntityManager): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const usingManager = transactionManager ?? manager;

      const [err] = await to(usingManager.update(Post, id, { isActive: false }));
      return err ? left<Error, null>(err) : right<Error, null>(null);
    };
  }

  function findRecent(options: {
    take: number;
    limit: number;
  }): TaskEither<Error, [Array<Post>, number]> {
    return async (): Promise<Either<Error, [Array<Post>, number]>> => {
      const [err, result] = await to<[Array<Post>, number]>(manager.findAndCount(Post, {
        ...options,
        order: { createdAt: 'DESC' },
      }));
      return err
        ? left<Error, [Array<Post>, number]>(err)
        : right<Error, [Array<Post>, number]>(result as [Array<Post>, number]);
    };
  }

  function findByQuery(
    options: {
      take: number;
      limit: number;
    },
    query: string,
  ): TaskEither<Error, [Array<Post>, number]> {
    return async (): Promise<Either<Error, [Array<Post>, number]>> => {
      const [err, result] = await to<[Array<Post>, number]>(manager.findAndCount(Post, {
        ...options,
        where: [
          { title: Like(`%${query}%`) },
        ],
      }));
      return err
        ? left<Error, [Array<Post>, number]>(err)
        : right<Error, [Array<Post>, number]>(result as [Array<Post>, number]);
    };
  }

  function findById(id: number): TaskEither<Error, Post> {
    return async (): Promise<Either<Error, Post>> => {
      const [err, result] = await to<Post | undefined>(manager.findOne(Post, id));
      return err
        ? left<Error, Post>(err)
        : (!result ? left<Error, Post>(new Error()) : right<Error, Post>(result));
    };
  }

  function findCategoryByName(name: string): TaskEither<Error, Category> {
    return async (): Promise<Either<Error, Category>> => {
      const [err, result] = await to<Category | undefined>(manager.findOne(Category, { name }));
      return err
        ? left<Error, Category>(err)
        : (!result ? left<Error, Category>(new Error()) : right<Error, Category>(result));
    };
  }

  function findCategoriesByName(categories: Array<{ name: string }>): TaskEither<Error, Array<Category>> {
    async function findCategory(name: string): Promise<Category> {
      const [err, result] = await to<Category | undefined>(manager.findOne(Category, { name }));

      if (err) {
        throw err;
      }

      if (!result) {
        throw new Error();
      }

      return result;
    }

    return async (): Promise<Either<Error, Array<Category>>> => {
      const [err, result] = await to<Array<Category>>(
        Promise.all(categories.map((category) => findCategory(category.name))),
      );
      return err
        ? left<Error, Array<Category>>(err)
        : (!result ? left<Error, Array<Category>>(new Error()) : right<Error, Array<Category>>(result));
    };
  }

  return {
    create,
    update,
    remove,
    findRecent,
    findByQuery,
    findById,
    findCategoryByName,
    findCategoriesByName,
  };
};
