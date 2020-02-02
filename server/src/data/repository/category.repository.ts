import { Either } from '@lib/either';
import { Category } from '../entity';

export type CategoryRepository = {
  readonly createCategory: (category: {
    name: string;
  }) => Promise<Either<Error, Category>>;

  readonly updateCategory: (category: {
    id: string | number;
    name: string;
  }) => Promise<Either<Error, boolean>>;

  readonly deleteCategory: (category: {
    id: string | number;
  }) => Promise<Either<Error, boolean>>;

  readonly findCategories: () => Promise<Either<Error, Array<Category>>>;
};
