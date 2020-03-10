import { Category } from './Category';

export interface Feed {
  id: string | number;
  title: string;
  summary: string;
  thumbnail?: string;
  createdAt: Date;
  categories: Array<Category>;
}
