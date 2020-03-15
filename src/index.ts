import 'reflect-metadata';
import './config/ts-path';
import { Express } from 'express';
import { fold, chain } from 'fp-ts/lib/TaskEither';
import { of } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import makeApp from './app';
//eslint-disable-next-line import/no-named-default
import { connect, ormconfig } from './config/ormconfig';

chain(connect)(ormconfig)();

pipe(
  ormconfig,
  chain(connect),
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  chain((_) => makeApp()),
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
