import { UserRole } from './user-role.type';

export type UserSession = {
  id: number;
  email: string;
  role: UserRole;
};
