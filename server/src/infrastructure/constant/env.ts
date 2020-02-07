import 'dotenv/config';
import { TaskEither, left, right, ap } from 'fp-ts/lib/TaskEither';

export type GoogleEnv = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
};

function getEnv(key: string): TaskEither<Error, string> {
  const env = process.env[key];
  return env === undefined ? left(new Error()) : right(env);
}

const combineGoogleEnv = ((clientId: string) => {
  return ((clientSecret: string) => {
    return ((redirectUri: string) => {
      return {
        clientId,
        clientSecret,
        redirectUri,
      };
    });
  });
});

export function getGoogleEnv(): TaskEither<Error, GoogleEnv> {
  return ap(getEnv('GOOGLE_REDIRECT_URI'))
    (ap(getEnv('GOOGLE_CLIENT_SECRET'))
    (ap(getEnv('GOOGLE_CLIENT_ID'))
    (right(combineGoogleEnv))));
}