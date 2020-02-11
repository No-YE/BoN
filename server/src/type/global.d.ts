import { UserSession } from './user-session.type';

declare global {
  namespace Express {
    interface Session {
      user?: UserSession;
    }
  }
}