import { google } from 'googleapis';
import { decode } from 'jsonwebtoken';
import {
  TaskEither, left, right, chain,
} from 'fp-ts/lib/TaskEither';
import Either from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { UserRepository } from '~/data/repository/user.repository';
import {
  CreateUserDto, UpdateUserRoleDto, DeleteUserDto, FindUserDto, SigninDto, SigninCallbackDto,
} from '../dto/user.dto';
import { User } from '~/data/entity';
import { GoogleEnv, getGoogleEnv } from '~/infrastructure/constant/env';

function getEmailFromCode(code: string): TaskEither<Error, string> {
  const getTokenFromGoogle = (envs: GoogleEnv): TaskEither<Error, any> => {
    return async () => {
      const { clientId, clientSecret, redirectUri } = envs;
      const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
      const res = await client.getToken(code);
      return Either.right(res.tokens);
    };
  }

  const getIdTokenFromCredential = (tokens: any) => {
    return tokens.id_token ? right(tokens.id_token) : left(new Error());
  }

  const getEmailFromIdToken = (idToken: string): TaskEither<Error, string> => {
    const decodedIdToken = decode(idToken) as { emails?: string };
    return decodedIdToken.emails ? left(new Error()) : right(decodedIdToken.emails);
  };

  return pipe(
    chain(getTokenFromGoogle)(getGoogleEnv()),
    chain(getIdTokenFromCredential),
    chain(getEmailFromIdToken),
  );
}

export default function makeUserService(userRepository: UserRepository) {
  async function createUser(dto: CreateUserDto): Promise<Either<Error, User>> {
    const createResult = await userRepository.createUser({ ...dto });

    return match<Either<Error, User>, Error, User>(
      createResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function updateUserRole(dto: UpdateUserRoleDto): Promise<Either<Error, boolean>> {
    const updateRoleResult = await userRepository.updateRole({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      updateRoleResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function deleteUser(dto: DeleteUserDto): Promise<Either<Error, boolean>> {
    const deleteResult = await userRepository.deleteUser({ ...dto });

    return match<Either<Error, boolean>, Error, boolean>(
      deleteResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  async function findUser(dto: FindUserDto): Promise<Either<Error, Array<User>>> {
    const findResult = await userRepository.findUser({ ...dto });

    return match<Either<Error, Array<User>>, Error, Array<User>>(
      findResult,
      (l) => left(l),
      (r) => right(r),
    );
  }

  function signin(dto: SigninDto): boolean {
    const { method, role } = dto;

    return method === 'GET' && role !== undefined;
  }

  async function signinCallback(dto: SigninCallbackDto): Promise<Either<Error, void>> {
    return;
  }

  return {
    createUser,
    updateUserRole,
    deleteUser,
    findUser,
  };
}

const obj = {
  a: 1,
  getA(): number {
    return this.a;
  },
};

obj['getA']();
