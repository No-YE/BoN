import express, { Request, Response, Express } from 'express';
import expressSession from 'express-session';
import next from 'next';
import path from 'path';
import to from 'await-to-js';
import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Either, left, right } from 'fp-ts/lib/Either';
import helmet from 'helmet';
import expressAsyncHandler from 'express-async-handler';
import makeRouter from './presenter/rest';
import errorMiddleware from './presenter/rest/middleware/error.middleware';
import sitemapMiddleware from './presenter/rest/middleware/sitemap.middleware';

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
    .use(helmet())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(expressSession({
      secret: process.env.SESSION_SECRET ?? 'a',
      saveUninitialized: true,
      resave: false,
    }))
    .use(expressAsyncHandler(sitemapMiddleware))
    .use('/api', makeRouter())
    .all('*', (req: Request, res: Response) => handle(req, res))
    .use(errorMiddleware);

  return right<Error, Express>(app);
};
