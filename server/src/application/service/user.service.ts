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
import { UserRole } from '~/infrastructure/type';

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
  function createUser(dto: CreateUserDto): TaskEither<Error, User> {
    return userRepository.createUser({ ...dto });
  }

  function updateUserRole(dto: UpdateUserRoleDto): TaskEither<Error, boolean> {
    return userRepository.updateRole({ ...dto });
  }

  function deleteUser(dto: DeleteUserDto): TaskEither<Error, boolean> {
    return userRepository.deleteUser({ ...dto });
  }

  function findUser(dto: FindUserDto): TaskEither<Error, Array<User>> {
    return userRepository.findUser({ ...dto });
  }

  function signin(dto: SigninDto): boolean {
    const { method, role } = dto;

    return method === 'GET' && role !== undefined;
  }

  function signinCallback(dto: SigninCallbackDto): TaskEither<Error, {
    id: string | number;
    email: string;
    role: UserRole;
  }> {
    const { code } = dto;

    return pipe(
      getEmailFromCode(code),
      chain((email: string) => right<Error, object>({ email })),
      chain(userRepository.findUserByEmail),
      chain((user: User) => {
        const { id, email, role } = user;
        return right({ id, email, role });
      }),
    );
  }

  return {
    createUser,
    updateUserRole,
    deleteUser,
    findUser,
    signin,
    signinCallback,
  };
}