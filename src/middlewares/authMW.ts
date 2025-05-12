import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { config } from '../configs/index';
import { Role, ROLES } from "../utils/constants";

interface RequestWithSession extends Request {
  session: Session & {
    user?: {
      email: string;
      name: string;
      role?: Role;
    }
  }
}

const authMiddleware = (req: RequestWithSession, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    return res.redirect(`${config.url}/api/v1/auth/login`);
  }
  next();
};

const ownerMiddleware = (req: RequestWithSession, res: Response, next: NextFunction) => {
  if (!req.session.user?.role || req.session.user.role !== ROLES.OWNER) {
    res.status(403).json({
      message: 'Forbidden'
    });
    return;
  }
  next();
};

const adminMiddleware = (req: RequestWithSession, res: Response, next: NextFunction) => {
  if (!req.session.user?.role || req.session.user.role !== ROLES.ADMIN) {
    res.status(403).json({
      message: 'Forbidden'
    });
    return;
  }
  next();
};

export { authMiddleware, adminMiddleware, ownerMiddleware };
