import { Request as ExpressRequest, Response, NextFunction } from 'express';
// import { userService } from '../services/userService';
import { AuthError } from '../utils/errors';
import { verifyToken } from '../utils/jwt';
import logger from '../utils/logger';
import { config } from '../configs/index';

// extend Request type
declare global {
  namespace Express {
    interface Request {
      targetUserId?: string;  // add target user ID
      isAdmin: boolean;      // is admin
      isUserVIP: boolean;    // is user VIP
    }
  }
}

export const authMiddleware = async (req: ExpressRequest, res: Response, next: NextFunction) => {
  try {
    // 1. get token from header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      logger.error(`${req.method} ${req.url} - no token provided`);
      throw new AuthError('NO_TOKEN', 'no token provided');
    }

    // 2. verify token
    const decoded = verifyToken(token);
    
    // 3. find user
    const user = 'test'
    // const user = await userService.getUserByOpenid(decoded.openId);
    if (!user) {
      logger.error(`${req.method} ${req.url} - authMW: user not found`);
      throw new AuthError('USER_NOT_FOUND', 'authMW:user not found');
    }

    // 4. check user session is expired
    // if (!user.sessionKey || !user.sessionExpireAt || user.sessionExpireAt < new Date()) {
    //   logger.error(`${req.method} ${req.url} - session expired`);
    //   throw new AuthError('SESSION_EXPIRED', 'session expired');
    // }

    // add user info to request object
    // req.user = user;
    const isUserVIP = true;
    req.isUserVIP = isUserVIP;
    logger.info(`${req.method} ${req.url} - authMW: authentication success`);
    next();

  } catch (error: any) {
    logger.error(`${req.method} ${req.url} - authMW: authentication failed: ${error.message}`);
    if (error instanceof AuthError) {
      return res.status(401).json({
        code: error.code,
        message: error.message
      });
    }
    return res.status(401).json({
      code: 'AUTH_FAILED',
      message: 'authMW: authentication failed'
    });
  }
};

// admin permission
// export const adminMiddleware = async (req: ExpressRequest, res: Response, next: NextFunction) => {
//   try {
//     const adminKey = req.headers['x-admin-key'];
//     const targetUserId = req.headers['x-target-user'] as string;  // get target user ID from header
    
    // if (adminKey !== config.adminSecretKey) {
    //   logger.error(`${req.method} ${req.url} - adminMW: no admin permission`);
    //   throw new AuthError('NO_ADMIN_PERMISSION', 'adminMW:no admin permission');
    // }

//     req.isAdmin = true;
//     if (targetUserId) {
//       req.targetUserId = targetUserId;
//       logger.info(`admin is operating user(${targetUserId}) info`);
//     }

//     next();
//   } catch (error: any) {
//     logger.error(`${req.method} ${req.url} - adminMW: authentication failed: ${error.message}`);
//     if (error instanceof AuthError) {
//       return res.status(401).json({
//         code: error.code,
//         message: error.message
//       });
//     }
//   }
// };
