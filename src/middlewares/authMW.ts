import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { config } from '../configs/index';

interface RequestWithSession extends Request {
  session: Session & {
    user?: {
      email: string;
      name: string;
      isAdmin?: boolean;
    }
  }
}

const authMiddleware = (req: RequestWithSession, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.redirect(`${config.url}/api/v1/auth/login`);
  }
  next();
};

const adminMiddleware = (req: RequestWithSession, res: Response, next: NextFunction) => {
  if (!req.session.user?.isAdmin) {
    return res.redirect(`${config.url}/api/v1/auth/login`);
  }
  next();
};

export { authMiddleware, adminMiddleware };
