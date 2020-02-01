import { Either } from '@lib/either';
import { UserRole } from '~/infrastructure/type';
import { User } from '../entity';

export type UserRepository = {
  readonly createUser: (user: User) => Promise<Either<Error, User>>;
  readonly updateRole: (user: {
    id: string | number;
    role: UserRole;
  }) => Promise<Either<Error, boolean>>;
  readonly deleteUser: (user: {
    id: string | number;
  }) => Promise<Either<Error, boolean>>;
  readonly findUser: (user: {
    id: string | number;
  }) => Promise<Either<Error, Array<User>>>;
};
