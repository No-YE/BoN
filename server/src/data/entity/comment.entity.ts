import { Post } from './post.entity';
import { Base } from './base.entity';

export type Comment = {
  content: string,
  post: Post,
} & Base;
