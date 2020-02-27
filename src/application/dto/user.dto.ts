import { UserRole } from '~/type';

export type CreateUserDto = {
  name: string;
  email: string;
  role: UserRole;
};

export type UpdateUserRoleDto = {
  id: number;
  role: UserRole;
};

export type DeleteUserDto = {
  id: number;
};

export type SigninCallbackDto = {
  code: string;
};
