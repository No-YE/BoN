import { google } from 'googleapis';
import { decode } from 'jsonwebtoken';
import { UserRepository } from '~/data/repository/user.repository';
import {
  CreateUserDto, UpdateUserRoleDto, DeleteUserDto, FindUserDto, SigninDto, SigninCallbackDto,
} from '../dto/user.dto';
import {
  Either, left, right, match,
} from '~/infrastructure/lib/either';
import { pipe } from '~/infrastructure/lib/pipe';
import { User } from '~/data/entity';
import { getGoogleEnv, GoogleEnv } from '~/infrastructure/constant/env';

async function getEmailFromCode(code: string): Promise<Either<Error, string>> {
  const getEmail = pipe<
  string,
  Either<Error, GoogleEnv>,
  Promise<Either<Error, string>>,
  Promise<Either<Error, string>>
  >(
    code,
    getGoogleEnv,
    (errorOrEnvs: Either<Error, GoogleEnv>) => match(
      errorOrEnvs,
      (l) => Promise.resolve(left(l)),
      async (envs) => {
        const { clientId, clientSecret, redirectUri } = envs;
        const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
        const { tokens } = await client.getToken(code);

        return tokens.id_token === undefined ? left(new Error()) : right(tokens.id_token);
      },
    ),
    async (errorOrIdTokenPromise: Promise<Either<Error, string>>) => {
      const errorOrIdToken = await errorOrIdTokenPromise;

      return match(
        errorOrIdToken,
        (l) => left(l),
        (idToken) => {
          const decodedToken = decode(idToken) as { emails?: string };
          return decodedToken.emails === undefined ? left(new Error()) : right(decodedToken.emails);
        },
      );
    },
  );

  return getEmail;
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
