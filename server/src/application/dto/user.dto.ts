import { UserRole } from "~/infrastructure/type";

export type CreateUserDto = {
  name: string,
  email: string,
  role: UserRole,
};

export type UpdateUserRoleDto = {
  id: string | number,
  role: UserRole,
};
