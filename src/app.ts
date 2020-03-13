import './config/ts-path';
import express, {
  Request, Response, NextFunction, Express,
} from 'express';
import expressSession from 'express-session';
import next from 'next';
import path from 'path';
import to from 'await-to-js';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Either, left, right } from 'fp-ts/lib/Either';
import makeRouter from './presenter/rest';

export default (): TaskEither<Error, Express> => async (): Promise<Either<Error, Express>> => {
  const dev = process.env.NODE_ENV !== 'production';
  const dir = path.resolve(__dirname, './webview');

  const app = express();
  const nextApp = next({ dev, dir });

  const [nextErr] = await to(nextApp.prepare());

  if (nextErr) {
    return left<Error, Express>(nextErr);
  }

  const handle = nextApp.getRequestHandler();

  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(expressSession({
      secret: process.env.SESSION_SECRET ?? 'a',
      saveUninitialized: true,
      resave: false,
    }))
    .use('/api', makeRouter())
    .all('*', (req: Request, res: Response) => handle(req, res))
    .use((err: Error, req: Request, res: Response, nextF: NextFunction): void => {
      console.log(err);
      res.send(err).end();
      nextF();
    });

  return right<Error, Express>(app);
};
