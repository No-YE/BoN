import 'dotenv/config';
import { Either } from 'fp-ts/lib/Either';
import Joi from 'typesafe-joi';
import validate from '~/lib/validate';

export type GoogleEnv = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

function googleEnvValidate(
  obj: { [key in keyof GoogleEnv]: unknown },
): Either<Error, GoogleEnv> {
  const schema = Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    redirectUri: Joi.string().required(),
  });

  return validate<GoogleEnv>(schema, obj);
}

export function getGoogleEnv(): Either<Error, GoogleEnv> {
  return googleEnvValidate({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });
}

export type MysqlEnv = {
  nodeEnv: string;
  database: string;
  host: string;
  username: string;
  port: number;
  password: string;
};

function mysqlEnvValidate(
  obj: { [key in keyof MysqlEnv]: unknown },
): Either<Error, MysqlEnv> {
  const schema = Joi.object({
    nodeEnv: Joi.string().required(),
    database: Joi.string().required(),
    host: Joi.string().required(),
    username: Joi.string().required(),
    port: Joi.number().required(),
    password: Joi.string().required(),
  });

  return validate<MysqlEnv>(schema, obj);
}

export function getMysqlEnv(): Either<Error, MysqlEnv> {
  return mysqlEnvValidate({
    nodeEnv: process.env.NODE_ENV,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
  });
}

export type SentryEnv = {
  nodeEnv: string;
  dsn: string;
};

function sentryEnvValidate(
  obj: { [key in keyof SentryEnv]: unknown },
): Either<Error, SentryEnv> {
  const schema = Joi.object({
    nodeEnv: Joi.string().required(),
    dsn: Joi.string().required(),
  });

  return validate<SentryEnv>(schema, obj);
}

export function getSentryDsn(): Either<Error, SentryEnv> {
  return sentryEnvValidate({
    nodeEnv: process.env.NODE_ENV,
    dsn: process.env.SENTRY_DSN,
  });
}

function jwtEnvValidate(jwt?: string): Either<Error, string> {
  const schema = Joi.string().required();

  return validate<string>(schema, jwt as string);
}

export function getJwtSecret(): Either<Error, string> {
  return jwtEnvValidate(process.env.JWT_SECRET);
}
