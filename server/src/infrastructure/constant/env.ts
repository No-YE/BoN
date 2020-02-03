import 'dotenv/config';
import { Either, left, right } from '../lib/either';

function checkEnv(env: string): Either<Error, string> {
  const envValue = process.env[env];

  return envValue === undefined ? left(new Error()) : right(envValue);
}

export function getGoogle() {
  return {
    clientId: checkEnv('GOOGLE_CLIENT_ID'),
    clientSecret: checkEnv('GOOGLE_CLIENT_SECRET'),
    redirectUri: checkEnv('GOOGLE_REDIRECT_URI'),
  };
}
