import { Base } from './base.entity';
import { User } from './user.entity';

export type PostImage = {
  path: string;
  user: User;
} & Base;