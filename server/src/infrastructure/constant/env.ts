import 'dotenv/config';
import _ from 'lodash';
import { Either, left, right } from '../lib/either';

export type GoogleEnv = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export function getGoogleEnv(): Either<Error, GoogleEnv> {
  const envs = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI'];
  const filtedEnvs = _
    .chain(envs)
    .map((env) => process.env[env])
    .filter((env) => env !== undefined)
    .value();

  return envs.length !== filtedEnvs.length ? left(new Error()) : right({
    clientId: filtedEnvs[0],
    clientSecret: filtedEnvs[1],
    redirectUri: filtedEnvs[2],
  });
}
