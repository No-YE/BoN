import 'dotenv/config';
['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI'])['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI'])import _ from 'lodash';
import { Either, left, right } from '../lib/either';

function checkEnv(env: string): boolean {
  const envValue = process.env[env];

  return envValue !== undefined;
}

export function getGoogle(): Either<Error, object> {
  const envs = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI'];
  const filtedEnvs = _
    .chain(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REDIRECT_URI'])
    .map((env) => checkEnv(env))
    .filter((env) => env)
    .value();

  return envs.length !== filtedEnvs.length ? left(new Error()) : right({
    clientId: checkEnv('GOOGLE_CLIENT_ID'),
    clientSecret: checkEnv('GOOGLE_CLIENT_SECRET'),
    redirectUri: checkEnv('GOOGLE_REDIRECT_URI'),
  });
}
