import 'dotenv/config';
import { TaskEither, left, right, ap } from 'fp-ts/lib/TaskEither';

export type GoogleEnv = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export type MysqlEnv = {
  host: string;
  user: string;
  port: string;
  password: string;
};

function getEnv(key: string): TaskEither<Error, string> {
  const env = process.env[key];
  return env === undefined ? left(new Error()) : right(env);
}

const combineGoogleEnv = ((clientId: string) => ((clientSecret: string) => ((redirectUri: string) => ({
  clientId,
  clientSecret,
  redirectUri,
}))));

const combineMysqlEnv = ((host: string) => ((user: string) => ((port: string) => ((password: string) => ({
  host,
  user,
  port,
  password,
})))));

export function getGoogleEnv(): TaskEither<Error, GoogleEnv> {
  return ap(getEnv('GOOGLE_REDIRECT_URI'))
    (ap(getEnv('GOOGLE_CLIENT_SECRET'))
    (ap(getEnv('GOOGLE_CLIENT_ID'))
    (right(combineGoogleEnv))));
}

export function getMysqlEnv(): TaskEither<Error, MysqlEnv> {
  return ap(getEnv('MYSQL_PASSWORD'))
    (ap(getEnv('MYSQL_PORT'))
    (ap(getEnv('MYSQL_USER'))
    (ap(getEnv('MYSQL_HOST'))
    (right(combineMysqlEnv)))));
}
