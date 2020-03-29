import { Request, Response, NextFunction } from 'express';
import * as Sentry from '@sentry/node';
import { Error400, Error401, Error404 } from '../../../lib/error';

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  switch (true) {
    case err instanceof Error400:
      res.status(400).end();
      break;
    case err instanceof Error401:
      res.status(401).end();
      break;
    case err instanceof Error404:
      res.status(404).end();
      break;
    default:
      Sentry.captureException(err);
      console.log(err);
      res.status(500).end('internal server error');
  }

  return next();
};
