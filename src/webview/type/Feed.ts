import { Category } from './Category';

export interface Feed {
  id: string | number;
  title: string;
  summary: string;
  createdAt: Date;
  categories: Array<Category>;
}
