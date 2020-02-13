import express, { Request, Response } from 'express';
import next from 'next';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';
const dir = path.resolve(__dirname, './webview');

async function createApp(): Promise<void> {
  const app = express();
  const nextApp = next({ dev, dir });

  await nextApp.prepare();

  const handle = nextApp.getRequestHandler();

  app.all('*', (req: Request, res: Response) => handle(req, res));

  app.listen(4000, () => {
    console.log('server start');
  });
}

createApp();
