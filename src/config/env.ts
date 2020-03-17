import 'dotenv/config';
import {
  Either, left, right, ap,
} from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

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

export type SentryEnv = {
  nodeEnv: string;
  dsn: string;
};

function getEnv(key: string): Either<Error, string> {
  const env = process.env[key];
  return env === undefined ? left(new Error()) : right(env);
}

function getEnvAsNumber(key: string): Either<Error, number> {
  const env = process.env[key];
  const value = Number(env);
  return Number.isNaN(value) ? left(new Error()) : right(value);
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

const combineSentryEnv = (nodeEnv: string) => (dsn: string): SentryEnv => ({ nodeEnv, dsn });

export function getGoogleEnv(): Either<Error, GoogleEnv> {
  return pipe(
    right(combineGoogleEnv),
    ap(getEnv('GOOGLE_CLIENT_ID')),
    ap(getEnv('GOOGLE_CLIENT_SECRET')),
    ap(getEnv('GOOGLE_REDIRECT_URI')),
  );
}

export function getMysqlEnv(): Either<Error, MysqlEnv> {
  return pipe(
    right(combineMysqlEnv),
    ap(getEnv('NODE_ENV')),
    ap(getEnv('MYSQL_DATABASE')),
    ap(getEnv('MYSQL_HOST')),
    ap(getEnv('MYSQL_USERNAME')),
    ap(getEnvAsNumber('MYSQL_PORT')),
    ap(getEnv('MYSQL_PASSWORD')),
  );
}

export function getSentryDsn(): Either<Error, SentryEnv> {
  return pipe(
    right(combineSentryEnv),
    ap(getEnv('NODE_ENV')),
    ap(getEnv('SENTRY_DSN')),
  );
}
