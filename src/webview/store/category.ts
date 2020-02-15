import { Category } from '../type/Category';

export default interface CategoryStore {
  isOpen: boolean;
  categories: Array<Category> | null;
}
