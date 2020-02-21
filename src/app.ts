import express, {
  Request, Response, NextFunction,
} from 'express';
import next from 'next';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const dir = path.resolve(__dirname, './webview');

async function createApp(): Promise<void> {
  const app = express();
  const nextApp = next({ dev, dir });

  await nextApp.prepare();

  const handle = nextApp.getRequestHandler();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
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
