import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Category } from '../entity';

export type CategoryRepository = {
  readonly createCategory: (category: {
    name: string;
  }) => TaskEither<Error, Category>;

  readonly updateCategory: (category: {
    id: string | number;
    name: string;
  }) => TaskEither<Error, boolean>;

  readonly deleteCategory: (category: {
    id: string | number;
  }) => TaskEither<Error, boolean>;

  readonly findCategories: () => TaskEither<Error, Array<Category>>;
};
