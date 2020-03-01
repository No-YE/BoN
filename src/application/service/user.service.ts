import { google } from 'googleapis';
import { decode } from 'jsonwebtoken';
import {
  TaskEither, left, right, chain, map,
} from 'fp-ts/lib/TaskEither';
import * as Either from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import makeUserRepository from '~/domain/repository/user.repository';
import {
  UpdateUserRoleDto, DeleteUserDto, SigninCallbackDto,
} from '../dto/user.dto';
import User from '~/domain/aggregate/user';
import { GoogleEnv, getGoogleEnv } from '~/config/env';
import { UserSession, UserRole } from '~/type';
import { Social } from '~/type/social.type';

type Tokens = { id_token: string };
type DecodedToken = {
  email: string;
  name: string;
};

function generateAuthUrl(envs: GoogleEnv): string {
  const { clientId, clientSecret, redirectUri } = envs;
  const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
  });
}

function getUserInfoFromGoogleCode(code: string): TaskEither<Error, DecodedToken & { social: Social }> {
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

  function getUserInfoFromIdToken(idToken: string): TaskEither<Error, DecodedToken & { social: Social }> {
    const decodedIdToken = decode(idToken) as DecodedToken;
    return decodedIdToken.email && decodedIdToken.name
      ? right({ ...decodedIdToken, social: 'google' })
      : left(new Error());
  }

  return pipe(
    chain(getTokenFromGoogle)(getGoogleEnv()),
    chain(getIdTokenFromCredential),
    chain(getUserInfoFromIdToken),
  );
}

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makeUserService() {
  const repository = makeUserRepository();

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
      getUserInfoFromGoogleCode(code),
      chain(repository.findOrCreateByEmail),
      chain((user: User) => right({
        id: user.id as number,
        email: user.email as string,
        role: user.role as UserRole,
      })),
    );
  }

  return {
    updateUserRole,
    deleteUser,
    signin,
    signinCallback,
  };
}
