import { Request, NextFunction, Response } from 'express';
import { Error401 } from '../error';

export default (req: Request, _res: Response, next: NextFunction): void => (
  req.session?.user?.role === 'admin'
    ? next()
    : next(Error401.of())
);
