import { User } from './user.entity';
import { Base } from './base.entity';

export type Post = {
  title: string,
  content: string,
  user: User,
  comments: Array<Comment>,
} & Base;
