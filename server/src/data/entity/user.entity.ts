import { UserRole } from '~/infrastructure/type';
import { Post } from './post.entity';
import { Base } from './base.entity';

export type User = {
  name: string,
  profileId: string,
  role: UserRole,
} & Base;
