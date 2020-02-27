import { google } from 'googleapis';
import { decode } from 'jsonwebtoken';
import {
  TaskEither, left, right, chain, map,
} from 'fp-ts/lib/TaskEither';
import * as Either from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import makeUserRepository from '~/domain/repository/user.repository';
import {
  CreateUserDto, UpdateUserRoleDto, DeleteUserDto, SigninCallbackDto,
} from '../dto/user.dto';
import User from '~/domain/aggregate/user';
import { GoogleEnv, getGoogleEnv } from '~/constant/env';
import { UserSession, UserRole } from '~/type';

type Tokens = { id_token: string };

function generateAuthUrl(envs: GoogleEnv): string {
  const { clientId, clientSecret, redirectUri } = envs;
  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
  });
}

function getEmailFromCode(code: string): TaskEither<Error, string> {
  function getTokenFromGoogle(envs: GoogleEnv): TaskEither<Error, Tokens> {
    return async (): Promise<Either.Either<Error, Tokens>> => {
      const { clientId, clientSecret, redirectUri } = envs;
      const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
      const res = await client.getToken(code);
      return Either.right(res.tokens as Tokens);
    };
  }

  function getIdTokenFromCredential(tokens: Tokens): TaskEither<Error, string> {
    return tokens.id_token ? right(tokens.id_token) : left(new Error());
  }

  function getEmailFromIdToken(idToken: string): TaskEither<Error, string> {
    const decodedIdToken = decode(idToken) as { emails: string };
    return decodedIdToken.emails ? left(new Error()) : right(decodedIdToken.emails);
  }

  return pipe(
    chain(getTokenFromGoogle)(getGoogleEnv()),
    chain(getIdTokenFromCredential),
    chain(getEmailFromIdToken),
  );
}

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makeUserService() {
  const repository = makeUserRepository();

  function createUser(dto: CreateUserDto): TaskEither<Error, null> {
    return repository.create({ ...dto, socialId: '' });
  }

  function updateUserRole(dto: UpdateUserRoleDto): TaskEither<Error, null> {
    return repository.update({ ...dto });
  }

  function deleteUser(dto: DeleteUserDto): TaskEither<Error, null> {
    return repository.remove(dto.id);
  }

  function signin(): TaskEither<Error, string> {
    return map(generateAuthUrl)(getGoogleEnv());
  }

  function signinCallback(dto: SigninCallbackDto): TaskEither<Error, UserSession> {
    const { code } = dto;

    return pipe(
      getEmailFromCode(code),
      chain((email: string) => right<Error, string>(email)),
      chain(repository.findByEmail),
      chain((user: User) => right({
        id: user.id as number,
        email: user.email as string,
        role: user.role as UserRole,
      })),
    );
  }

  return {
    createUser,
    updateUserRole,
    deleteUser,
    signin,
    signinCallback,
  };
}
