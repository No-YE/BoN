import 'dotenv/config';
import R from 'ramda/';
import { Either, left, right } from '../lib/either';

export type GoogleEnv = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

export function getGoogleEnv(): Either<Error, GoogleEnv> {
  const envs = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI'];

  const filtedEnvs = R.pipe(
    R.map((env: string) => process.env[env]),
    R.filter((env: string | undefined) => env !== undefined),
  )(envs);

  return envs.length !== filtedEnvs.length ? left(new Error()) : right({
    clientId: filtedEnvs[0],
    clientSecret: filtedEnvs[1],
    redirectUri: filtedEnvs[2],
  });
}
