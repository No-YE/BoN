import { getManager, EntityManager } from 'typeorm';
import to from 'await-to-js';
import { left, right, Either } from 'fp-ts/lib/Either';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import User from '../aggregate/user';
import { UserRole } from '~/type';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const manager = getManager();

  function create(
    user: {
      name: string;
      email: string;
      socialId: string;
      role: UserRole;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const usingManager = transactionManager ?? manager;
      const newUser = User.of(user);

      const [err] = await to(usingManager.save(newUser));
      return err ? left<Error, null>(err) : right<Error, null>(null);
    };
  }

  function update(
    user: {
      id: number;
      role: UserRole;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const usingManager = transactionManager ?? manager;

      const [err] = await to(usingManager.update(User, user.id, user));
      return err ? left<Error, null>(err) : right<Error, null>(null);
    };
  }

  function remove(
    id: number,
    transactionManager?: EntityManager,
  ): TaskEither<Error, null> {
    return async (): Promise<Either<Error, null>> => {
      const usingManager = transactionManager ?? manager;

      const [err] = await to(usingManager.delete(User, id));
      return err ? left<Error, null>(err) : right<Error, null>(null);
    };
  }

  function findById(id: number): TaskEither<Error, User> {
    return async (): Promise<Either<Error, User>> => {
      const [err, result] = await to(manager.findOne(User, id));
      return err ? left<Error, User>(err) : right<Error, User>(result as User);
    };
  }

  return {
    create,
    update,
    remove,
    findById,
  };
};
