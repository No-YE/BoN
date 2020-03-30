import 'reflect-metadata';
import 'source-map-support/register';
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
import { getSentryDsn, getInitEnv } from './config/env';
import voidValue from '~/lib/void';

pipe(
  ormconfig,
  chain(connect),
  chain(() => fromEither(getSentryDsn())),
  map((env) => Sentry.init({ dsn: env.dsn, environment: env.nodeEnv })),
  chain(() => fromEither(getInitEnv())),
  chain(makeApp),
  fold<Error, Express, void>(
    (error) => {
      console.log(error);
      Sentry.captureException(error);
      return of(voidValue);
    },
    (app: Express) => {
      app.listen(3000, () => console.log('server start'));
      return of(voidValue);
    },
  ),
)();
