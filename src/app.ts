import express, {
  Request, Response, NextFunction,
} from 'express';
import next from 'next';
import path from 'path';
import router from './presenter/rest';

const dev = process.env.NODE_ENV !== 'production';
const dir = path.resolve(__dirname, './webview');

async function createApp(): Promise<void> {
  const app = express();
  const nextApp = next({ dev, dir });

  await nextApp.prepare();

  const handle = nextApp.getRequestHandler();

  app
    .use(express.json())
    .use('/api', router)
    .use(express.urlencoded({ extended: true }))
    .all('*', (req: Request, res: Response) => handle(req, res))
    .use((err: Error, req: Request, res: Response, nextF: NextFunction): void => {
      console.log(err);
      res.send(err).end();
      nextF();
    });

  app.listen(4000, () => {
    console.log('server start');
  });
}

createApp();
