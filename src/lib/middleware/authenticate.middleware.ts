import { Request, NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Error401 } from '../error';
import { UserSession } from '~/type';

function verifyToken(headerToken: string): UserSession | undefined {
  try {
    return verify(headerToken, process.env.JWT_SECRET as string) as UserSession;
  } catch {
    return undefined;
  }
}

export default (req: Request, _res: Response, next: NextFunction): void => {
  const user = req.session?.user ?? verifyToken(req.headers.token as string);

  user?.role === 'admin'
    ? (
      req.user = user,
      next()
    )
    : next(Error401.of());
};
