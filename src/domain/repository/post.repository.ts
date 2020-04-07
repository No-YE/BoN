import {
  getManager, EntityManager, Like, UpdateResult,
} from 'typeorm';
import {
  TaskEither, tryCatch, map, chain, right, taskEither,
} from 'fp-ts/lib/TaskEither';
import { fromNullable, fold as optionFold } from 'fp-ts/lib/Option';
import { array } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  Post, PostSchema, Category, PostToCategory, CategorySchema, PostToCategorySchema,
} from '../aggregate/post';
import Error from '~/lib/error';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const manager = getManager();

  function create(
    post: {
      title: string;
      content: string;
      userId: number;
      thumbnail?: string;
    },
    categories: Array<Category>,
    transactionManager?: EntityManager,
  ): TaskEither<Error, Post> {
    const usingManager = transactionManager ?? manager;

    return pipe(
      tryCatch(
        () => usingManager.save<Post>(post),
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
      () => usingManager.save<PostToCategory>({ post, category }),
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
      () => usingManager.save<Category>(category),
      Error.of,
    );
  }

  function findRecent(options: {
    skip: number;
    take: number;
  }): TaskEither<Error, [Array<Post>, number]> {
    return tryCatch(
      () => manager.findAndCount<Post>(PostSchema, {
        ...options,
        order: { createdAt: 'DESC' },
        join: {
          alias: 'post',
          leftJoinAndSelect: {
            postToCategories: 'post.categories',
          },
        },
        where: [
          { isActive: true },
        ],
      }),
      Error.of,
    );
  }

  function findByQuery(
    options: {
      take: number;
      skip: number;
    },
    query: string,
  ): TaskEither<Error, [Array<Post>, number]> {
    return tryCatch(
      () => manager.findAndCount<Post>(PostSchema, {
        ...options,
        order: { createdAt: 'DESC' },
        join: {
          alias: 'post',
          leftJoinAndSelect: {
            postToCategories: 'post.categories',
          },
        },
        where: [
          {
            title: Like(`%${query}%`),
            isActive: true,
          },
        ],
      }),
      Error.of,
    );
  }

  function findById(id: number): TaskEither<Error, Post | undefined> {
    return tryCatch(
      () => manager.findOne<Post>(PostSchema, id, {
        relations: ['categories'],
        where: [
          { isActive: true },
        ],
      }),
      Error.of,
    );
  }

  function findByCategory(
    options: {
      take: number;
      skip: number;
    },
    categoryId: number,
  ): TaskEither<Error, [Array<Post>, number]> {
    const subQuery = manager
      .createQueryBuilder(PostToCategorySchema, 'postToCategory')
      .select('postToCategory.postId', 'postId')
      .where('postToCategory.categoryId = :categoryId', { categoryId })
      .getQuery();

    return tryCatch(
      () => manager
        .createQueryBuilder<Post>(PostSchema, 'post')
        .skip(options.skip)
        .take(options.take)
        .orderBy('post.createdAt', 'DESC')
        .innerJoinAndSelect('post.categories', 'category')
        .where('post.isActive = true')
        .andWhere(() => `post.id IN ${subQuery}`)
        .getManyAndCount(),
      Error.of,
    );
  }

  function findAllCategories(): TaskEither<Error, [Array<Category>, number]> {
    return tryCatch(
      () => manager.findAndCount<Category>(CategorySchema, {
        where: [
          { isActive: true },
        ],
      }),
      Error.of,
    );
  }

  function findCategoryByName(name: string): TaskEither<Error, Category | undefined> {
    return tryCatch(
      () => manager.findOne<Category>(CategorySchema, { name }, {
        where: [
          { isActive: true },
        ],
      }),
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

  function findAllIds(): TaskEither<Error, Array<Post>> {
    return tryCatch(
      () => manager.getRepository<Post>(PostSchema).find({
        select: ['id'],
        where: [
          { isActive: true },
        ],
      }),
      Error.of,
    );
  }

  function update(
    post: {
      id: number;
      title: string;
      content: string;
      thumbnail?: string;
      userId: number;
    },
    categories: Array<Category>,
    transactionManager?: EntityManager,
  ): TaskEither<Error, Post> {
    const usingManager = transactionManager ?? manager;

    return pipe(
      tryCatch(
        () => usingManager.save<Post>(post),
        Error.of,
      ),
      chain((savedPost) => createPostToCategories(savedPost, categories, usingManager)),
      map((postToCategories) => postToCategories[0]),
    );
  }

  function addViews(id: number, transactionManager?: EntityManager): TaskEither<Error, void> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      async () => {
        usingManager
          .createQueryBuilder()
          .update<Post>(PostSchema)
          .set({ views: () => 'views + 1' })
          .where('id = :id', { id })
          .execute();
      },
      Error.of,
    );
  }

  function remove(id: number, transactionManager?: EntityManager): TaskEither<Error, UpdateResult> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.update<Post>(PostSchema, id, { isActive: false }),
      Error.of,
    );
  }

  return {
    create,
    update,
    addViews,
    remove,
    findRecent,
    findByQuery,
    findById,
    findByCategory,
    findAllCategories,
    findOrCreateCategories,
    findAllIds,
  };
};
