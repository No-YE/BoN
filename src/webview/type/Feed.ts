import { Category } from './Category';

export interface Feed {
  id: string | number;
  title: string;
  summary: string;
  mainImageUri?: string;
  createdAt: Date;
  categories: Array<Category>;
}
