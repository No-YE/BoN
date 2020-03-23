//eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserSession } from '../user-session.type';

declare global {
  namespace Express {
    interface Session {
      user?: UserSession;
    }

    interface Request {
      user?: UserSession;
    }
  }
}
