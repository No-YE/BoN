import { User } from './user.entity';
import { Base } from './base.entity';

export type Post = {
  id: string;
  title: string;
  content: string;
  user: User;
  comments: Array<Comment>;
  createdAt: Date;
  updatedAt: Date;
} & Base;
