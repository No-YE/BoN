import {
  getManager, EntityManager, Like, UpdateResult,
} from 'typeorm';
import {
  TaskEither, tryCatch, map, chain, right, taskEither,
} from 'fp-ts/lib/TaskEither';
import { fromNullable, fold as optionFold } from 'fp-ts/lib/Option';
import { array } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import Post, { Category, PostToCategory } from '../aggregate/post';
import Error from '~/lib/error';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const manager = getManager();

  function create(
    post: {
      title: string;
      content: string;
      userId: number;
    },
    categories: Array<Category>,
    transactionManager?: EntityManager,
  ): TaskEither<Error, Post> {
    const usingManager = transactionManager ?? manager;

    return pipe(
      tryCatch(
        () => usingManager.save(Post.of(post)),
        Error.of,
      ),
      chain((savedPost) => createPostToCategories(savedPost, categories, usingManager)),
      map((postToCategories) => postToCategories[0]),
    );
  }

  function createPostToCategory(
    post: Post,
    category: Category,
    transactionManager?: EntityManager,
  ): TaskEither<Error, PostToCategory> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.save(PostToCategory.of({ post, category })),
      Error.of,
    );
  }

  function createPostToCategories(
    post: Post,
    categories: Array<Category>,
    transactionManager?: EntityManager,
  ): TaskEither<Error, [Post, Array<PostToCategory>]> {
    const usingManager = transactionManager ?? manager;

    return pipe(
      categories.map((category) => createPostToCategory(post, category, usingManager)),
      array.sequence(taskEither),
      map((postToCategories) => [post, postToCategories]),
    );
  }

  function createCategory(
    category: { name: string },
    transactionManager?: EntityManager,
  ): TaskEither<Error, Category> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.save(Category.of(category)),
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
        join: {
          alias: 'post',
          leftJoinAndSelect: {
            postToCategories: 'post.categories',
          },
        },
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
        join: {
          alias: 'post',
          leftJoinAndSelect: {
            postToCategories: 'post.categories',
          },
        },
        order: { createdAt: 'DESC' },
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

  function findByCategory(
    options: {
      take: number;
      limit: number;
    },
    categoryId: number,
  ): TaskEither<Error, [Array<Post>, number]> {
    return tryCatch(
      () => manager
        .createQueryBuilder(Post, 'post')
        .offset(options.take)
        .limit(options.limit)
        .orderBy('post.createdAt', 'DESC')
        .innerJoinAndSelect('post.categories', 'category')
        .where((qb) => {
          const subQuery = qb.subQuery()
            .select('postToCategory.postId', 'postId')
            .from(PostToCategory, 'postToCategory')
            .where('postToCategory.categoryId = :categoryId', { categoryId })
            .getQuery();
          return `post.id IN ${subQuery}`;
        })
        .getManyAndCount(),
      Error.of,
    );
  }

  function findAllCategories(): TaskEither<Error, [Array<Category>, number]> {
    return tryCatch(
      () => manager.findAndCount(Category),
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

  return {
    create,
    update,
    remove,
    findRecent,
    findByQuery,
    findById,
    findByCategory,
    findAllCategories,
    findOrCreateCategories,
  };
};
