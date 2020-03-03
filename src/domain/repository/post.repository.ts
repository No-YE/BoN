import {
  getManager, EntityManager, Like, UpdateResult,
} from 'typeorm';
import {
  TaskEither, tryCatch, map, chain, right, taskEither,
} from 'fp-ts/lib/TaskEither';
import { fromNullable, fold as optionFold } from 'fp-ts/lib/Option';
import { array } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import Post, { Category } from '../aggregate/post';
import Error from '~/lib/error';

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
  ): TaskEither<Error, Post> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.save(Post.of(post)),
      Error.of,
    );
  }

  function update(
    post: {
      id: number;
      title: string;
      content: string;
      categories: Array<Category>;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, UpdateResult> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.update(Post, post.id, post),
      Error.of,
    );
  }

  function remove(id: number, transactionManager?: EntityManager): TaskEither<Error, UpdateResult> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.update(Post, id, { isActive: false }),
      Error.of,
    );
  }

  function findRecent(options: {
    take: number;
    limit: number;
  }): TaskEither<Error, [Array<Post>, number]> {
    return tryCatch(
      () => manager.findAndCount(Post, {
        ...options,
        order: { createdAt: 'DESC' },
      }),
      Error.of,
    );
  }

  function findByQuery(
    options: {
      take: number;
      limit: number;
    },
    query: string,
  ): TaskEither<Error, [Array<Post>, number]> {
    return tryCatch(
      () => manager.findAndCount(Post, {
        ...options,
        where: [
          { title: Like(`%${query}%`) },
        ],
      }),
      Error.of,
    );
  }

  function findById(id: number): TaskEither<Error, Post | undefined> {
    return tryCatch(
      () => manager.findOne(Post, id),
      Error.of,
    );
  }

  function createCategory(
    category: { name: string },
    transactionManager?: EntityManager,
  ): TaskEither<Error, Category> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.save(category),
      Error.of,
    );
  }

  function findCategoryByName(name: string): TaskEither<Error, Post | undefined> {
    return tryCatch(
      () => manager.findOne(Category, { name }),
      Error.of,
    );
  }

  function findOrCreateCategory(category: { name: string }): TaskEither<Error, Category> {
    return pipe(
      findCategoryByName(category.name),
      map(fromNullable),
      chain(optionFold(
        () => createCategory(category),
        (p) => right(p),
      )),
    );
  }

  function findOrCreateCategories(categories: Array<{ name: string }>): TaskEither<Error, Array<Category>> {
    return pipe(
      categories.map(findOrCreateCategory),
      array.sequence(taskEither),
    );
  }

  return {
    create,
    update,
    remove,
    findRecent,
    findByQuery,
    findById,
    findOrCreateCategories,
  };
};
