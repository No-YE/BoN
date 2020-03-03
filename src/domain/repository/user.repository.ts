import { getManager, EntityManager, UpdateResult } from 'typeorm';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  TaskEither, tryCatch, map, chain, right,
} from 'fp-ts/lib/TaskEither';
import { fromNullable, fold as optionFold } from 'fp-ts/lib/Option';
import User from '../aggregate/user';
import { UserRole, Social } from '~/type';
import Error from '~/lib/error';

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default () => {
  const manager = getManager();

  function create(
    user: {
      name: string;
      email: string;
      social: Social;
      role?: UserRole;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, User> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.save(User.of(user)),
      Error.of,
    );
  }

  function update(
    user: {
      id: number;
      role: UserRole;
    },
    transactionManager?: EntityManager,
  ): TaskEither<Error, UpdateResult> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.update(User, user.id, user),
      Error.of,
    );
  }

  function remove(
    id: number,
    transactionManager?: EntityManager,
  ): TaskEither<Error, UpdateResult> {
    const usingManager = transactionManager ?? manager;

    return tryCatch(
      () => usingManager.update(User, id, { isActive: false }),
      Error.of,
    );
  }

  function findById(id: number): TaskEither<Error, User | undefined> {
    return tryCatch(
      () => manager.findOne(User, id),
      Error.of,
    );
  }

  function findByEmail(email: string): TaskEither<Error, User | undefined> {
    return tryCatch(
      () => manager.findOne(User, { email }),
      Error.of,
    );
  }

  function findOrCreateByEmail(
    user: {
      email: string;
      name: string;
      social: Social;
      role?: UserRole;
    },
  ): TaskEither<Error, User> {
    return pipe(
      findByEmail(user.email),
      map(fromNullable),
      chain(optionFold(
        () => create(user),
        (u) => right(u),
      )),
    );
  }

  return {
    update,
    remove,
    findById,
    findOrCreateByEmail,
  };
};
