import { User } from '../entity';
import { Either } from '@lib/either';
import { UserRole } from '~/infrastructure/type';

export type UserRepository = {
  readonly createUser: (user: User) => Promise<Either<Error, User>>;
  readonly updateRole: (user: User | string | number, role: UserRole) => Promise<Either<Error, boolean>>;
  readonly deleteUser: (user: User | string | number) => Promise<Either<Error, boolean>>;
};
