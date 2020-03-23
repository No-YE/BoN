import { UserRole } from '~/type';

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

export type CreateTokenDto = {
  id: number;
  role: UserRole;
  email: string;
};
