import { UserRole } from './user-role.type';

export type UserSession = {
  id: string | number;
  email: string;
  role: UserRole;
};