import { UserRole } from '~/infrastructure/type';
import { Base } from './base.entity';

export type User = {
  name: string;
  email: string;
  role: UserRole;
} & Base;
