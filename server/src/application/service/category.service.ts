import {
  left, right, match, Either,
} from '@lib/either';
import { CategoryRepository } from '~/data/repository/category.repository';
import { CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../dto/category.dto';
import { Category } from '~/data/entity';

export default function makeCategoryService(categoryRepository: CategoryRepository) {
  async function createCategory(dto: CreateCategoryDto): Promise<Either<Error, Category>> {
    const createResult = await categoryRepository.createCategory({ ...dto });

    return match<Either<Error, Category>, Error, Category>(
      createResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function updateCategory(dto: UpdateCategoryDto): Promise<Either<Error, boolean>> {
    const updateResult = await categoryRepository.updateCategory({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      updateResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function deleteCategory(dto: DeleteCategoryDto): Promise<Either<Error, boolean>> {
    const deleteResult = await categoryRepository.deleteCategory({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      deleteResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  return {
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
