import { google } from 'googleapis';
import { decode } from 'jsonwebtoken';
import {
  TaskEither, left, right, chain, map,
} from 'fp-ts/lib/TaskEither';
import * as Either from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { UserRepository } from '~/database/repository/user.repository';
import {
  CreateUserDto, UpdateUserRoleDto, DeleteUserDto, FindUserDto, SigninCallbackDto,
} from '../dto/user.dto';
import { User } from '~/database/entity';
import { GoogleEnv, getGoogleEnv } from '~/constant/env';
import { UserSession } from '~/type';

function generateAuthUrl(envs: GoogleEnv): string {
  const { clientId, clientSecret, redirectUri } = envs;
  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
  });
}

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
    const decodedIdToken = decode(idToken) as { emails: string };
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
    return userRepository.createUser({ ...dto, socialId: '' });
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

  function signin(): TaskEither<Error, string> {
    return map(generateAuthUrl)(getGoogleEnv())
  }

  function signinCallback(dto: SigninCallbackDto): TaskEither<Error, UserSession> {
    const { code } = dto;

    return pipe(
      getEmailFromCode(code),
      chain((email: string) => right<Error, { email: string }>({ email })),
      chain(userRepository.findUserByEmail),
      chain((user: User) => right({
        id: user.id!,
        email: user.email!,
        role: user.role!,
      })),
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