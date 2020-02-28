import 'dotenv/config';
import {
  TaskEither, left, right, ap,
} from 'fp-ts/lib/TaskEither';
import * as Either from 'fp-ts/lib/Either';

export type GoogleEnv = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export type MysqlEnv = {
  nodeEnv: string;
  database: string;
  host: string;
  username: string;
  port: number;
  password: string;
};

function getEnv(key: string): TaskEither<Error, string> {
  const env = process.env[key];
  return env === undefined ? left(new Error()) : right(env);
}

function getEnvEither(key: string): Either.Either<Error, string> {
  const env = process.env[key];
  return env === undefined ? Either.left(new Error()) : Either.right(env);
}

function getEnvAsNumberEither(key: string): Either.Either<Error, number> {
  const env = process.env[key];
  const value = Number(env);
  return Number.isNaN(value) ? Either.left(new Error()) : Either.right(value);
}

const combineGoogleEnv = (clientId: string) => (clientSecret: string) => (redirectUri: string): GoogleEnv => ({
  clientId,
  clientSecret,
  redirectUri,
});

const combineMysqlEnv = (nodeEnv: string) => (database: string) => (host: string) => (username: string) => (
  port: number,
) => (
  password: string,
): MysqlEnv => ({
  nodeEnv,
  database,
  host,
  username,
  port,
  password,
});

export function getGoogleEnv(): TaskEither<Error, GoogleEnv> {
  return ap(getEnv('GOOGLE_REDIRECT_URI'))(
    ap(getEnv('GOOGLE_CLIENT_SECRET'))(
      ap(getEnv('GOOGLE_CLIENT_ID'))(
        right(combineGoogleEnv),
      ),
    ),
  );
}

export function getMysqlEnv(): Either.Either<Error, MysqlEnv> {
  return Either.ap(getEnvEither('MYSQL_PASSWORD'))(
    Either.ap(getEnvAsNumberEither('MYSQL_PORT'))(
      Either.ap(getEnvEither('MYSQL_USERNAME'))(
        Either.ap(getEnvEither('MYSQL_HOST'))(
          Either.ap(getEnvEither('MYSQL_DATABASE'))(
            Either.ap(getEnvEither('NODE_ENV'))(
              Either.right(combineMysqlEnv),
            ),
          ),
        ),
      ),
    ),
  );
}
