import express, {
  Request, Response, Router, NextFunction,
} from 'express';
import next from 'next';
import path from 'path';
import { fold } from 'fp-ts/lib/Either';
import makeRestController from './presenter/rest';
import makeRepository from './database/repositoryImpl';
import { PostRepository } from './data/repository/post.repository';

const dev = process.env.NODE_ENV !== 'production';
const dir = path.resolve(__dirname, './webview');

async function getRouter(): Promise<Router> {
  return fold<Error, PostRepository, Router>(
    (err) => { throw err; },
    (postRepository) => makeRestController({ postRepository }),
  )(await makeRepository()());
}

async function createApp(): Promise<void> {
  const app = express();
  const nextApp = next({ dev, dir });
  const router = await getRouter();

  await nextApp.prepare();

  const handle = nextApp.getRequestHandler();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(router);
  app.all('*', (req: Request, res: Response) => handle(req, res));

  app.use((err: Error, req: Request, res: Response, nextF: NextFunction) => {
    console.log(err);
    res.send(err).end();
    nextF();
  });

  app.listen(4000, () => {
    console.log('server start');
  });
}

createApp();
