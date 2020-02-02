import { User } from './user.entity';
import { Base } from './base.entity';
import { Category } from './category.entity';

export type Post = {
  title: string;
  content: string;
  user: User;
  category: Category;
  comments?: Array<Comment>;
} & Base;
