import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { UpdateResult } from 'typeorm';
import { decode, sign } from 'jsonwebtoken';
import {
  TaskEither, left, right, chain, map, fromEither, tryCatch, fromOption,
} from 'fp-ts/lib/TaskEither';
import { fromNullable } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import makeUserRepository from '~/domain/repository/user.repository';
import {
  UpdateUserRoleDto, DeleteUserDto, SigninCallbackDto, CreateTokenDto,
} from '../dto/user.dto';
import User from '~/domain/aggregate/user';
import { GoogleEnv, getGoogleEnv, getJwtSecret } from '~/config/env';
import { UserSession, UserRole } from '~/type';
import { Social } from '~/type/social.type';
import Error from '~/lib/error';

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
  function getGoogleClient(envs: GoogleEnv): OAuth2Client {
    const { clientId, clientSecret, redirectUri } = envs;
    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  }

  function getTokenResponse(client: OAuth2Client): TaskEither<Error, GetTokenResponse> {
    return tryCatch(
      () => client.getToken(code),
      Error.of,
    );
  }

  function getIdTokenFromRes(res: GetTokenResponse): TaskEither<Error, string> {
    return pipe(
      fromNullable(res.tokens.id_token),
      fromOption<Error>(Error.of),
    );
  }

  function getUserInfoFromIdToken(idToken: string): TaskEither<Error, DecodedToken & { social: Social }> {
    const decodedIdToken = decode(idToken) as DecodedToken;
    return decodedIdToken.email && decodedIdToken.name
      ? right({ ...decodedIdToken, social: 'google' })
      : left(new Error());
  }

  return pipe(
    fromEither(getGoogleEnv()),
    map(getGoogleClient),
    chain(getTokenResponse),
    chain(getIdTokenFromRes),
    chain(getUserInfoFromIdToken),
  );
}

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function makeUserService() {
  const repository = makeUserRepository();

  function updateUserRole(dto: UpdateUserRoleDto): TaskEither<Error, UpdateResult> {
    return repository.update({ ...dto });
  }

  function deleteUser(dto: DeleteUserDto): TaskEither<Error, UpdateResult> {
    return repository.remove(dto.id);
  }

  function signin(): TaskEither<Error, string> {
    return pipe(
      fromEither(getGoogleEnv()),
      map(generateAuthUrl),
    );
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

  function createToken(dto: CreateTokenDto): TaskEither<Error, string> {
    return pipe(
      getJwtSecret(),
      fromEither,
      map((secret) => sign({ ...dto }, secret, { algorithm: 'HS512' })),
    );
  }

  return {
    updateUserRole,
    deleteUser,
    signin,
    signinCallback,
    createToken,
  };
}
