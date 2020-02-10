import { UserSession } from './user-session.type';
import { _Context } from './context.type';

declare global {
  namespace Express {
    interface Session {
      user?: UserSession;
    }
  }

  export interface Context extends _Context {}
}