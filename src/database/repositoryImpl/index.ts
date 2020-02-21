import { map, TaskEither } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { makeModels } from '../db';
import makePostRepository from './post.repository';
import { PostRepository } from '~/data/repository/post.repository';

export default (): TaskEither<Error, PostRepository> => pipe(
  makeModels(),
  map((models) => makePostRepository(models.sequelize, models.PostModel, models.CategoryModel)),
);
