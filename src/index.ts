import 'reflect-metadata';
import './config/ts-path';
import { Express } from 'express';
import * as Sentry from '@sentry/node';
import {
  fold, chain, fromEither, map,
} from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import makeApp from './app';
import { connect, ormconfig } from './config/ormconfig';
import { getSentryDsn } from './config/env';

pipe(
  ormconfig,
  chain(connect),
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  chain((_) => fromEither(getSentryDsn())),
  map((env) => Sentry.init({ dsn: env.dsn, environment: env.nodeEnv })),
  chain(makeApp),
  fold<Error, Express, number>(
    (error) => {
      console.log(error);
      return of(1);
    },
    (app: Express) => {
      app.listen(3000, () => console.log('server start'));
      return of(1);
    },
  ),
)();
