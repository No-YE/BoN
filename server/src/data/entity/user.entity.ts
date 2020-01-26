import { UserRole } from '~/lib/type';
import { Post } from './post.entity';
import { Base } from './base.entity';

export type User = {
  id: number;
  name: string,
  profileId: string,
  role: UserRole;
  posts: Array<Post>;
  createdAt: Date;
  updatedAt: Date;
} & Base;
