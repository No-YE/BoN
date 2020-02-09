import { UserSession } from '~/infrastructure/type';

declare global {
  namespace Express {
    interface Session {
      user?: UserSession;
    }
  }
}