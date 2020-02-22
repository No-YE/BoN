import { Base } from './base.entity';
import { Post } from './post.entity';

export type Category = {
  name: string;
  posts: Array<Post>;
} & Base;
