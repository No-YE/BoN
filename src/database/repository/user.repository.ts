import { TaskEither } from 'fp-ts/lib/TaskEither';
import { UserRole } from '~/type';
import { User } from '../aggregate';

export type UserRepository = {
  readonly createUser: (user: {
    name: string;
    socialId: string;
    email: string;
    role: string;
  }) => TaskEither<Error, User>;

  readonly updateRole: (user: {
    id: string | number;
    role: UserRole;
  }) => TaskEither<Error, boolean>;

  readonly deleteUser: (user: {
    id: string | number;
  }) => TaskEither<Error, boolean>;

  readonly findUser: (user: {
    id: string | number;
  }) => TaskEither<Error, Array<User>>;

  readonly findUserByEmail: (user: {
    email: string;
  }) => TaskEither<Error, User>;
};
