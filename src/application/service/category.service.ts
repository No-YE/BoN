import { TaskEither } from 'fp-ts/lib/TaskEither';
import { CategoryRepository } from '~/data/repository/category.repository';
import { CreateCategoryDto, UpdateCategoryDto, DeleteCategoryDto } from '../dto/category.dto';
import { Category } from '~/data/entity';

export default function makeCategoryService(categoryRepository: CategoryRepository) {
  function createCategory(dto: CreateCategoryDto): TaskEither<Error, Category> {
    return categoryRepository.createCategory({ ...dto });
  }

  function updateCategory(dto: UpdateCategoryDto): TaskEither<Error, boolean> {
    return categoryRepository.updateCategory({ ...dto });
  }

  function deleteCategory(dto: DeleteCategoryDto): TaskEither<Error, boolean> {
    return categoryRepository.deleteCategory({ ...dto });
  }

  function findCategories(): TaskEither<Error, Array<Category>> {
    return categoryRepository.findCategories();
  }

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    findCategories,
  };
}
