import { Request, Response } from 'express';
import { Session } from 'express-session';
import { userService } from '../services/userService';
import { SuccessHandler, ErrorHandler } from '../utils/response';
import { ResponseCode } from '../utils/constants';
import logger from '../utils/logger';

interface RequestWithSession extends Request {
  session: Session & {
    user?: {
      email: string;
      name: string;
      isAdmin?: boolean;
    }
  }
}

class UserController {
  // get current logged in user info
  async getUserProfile(req: RequestWithSession, res: Response): Promise<void> {
    try {
      if (!req.session.user?.email) {
        logger.error('User not logged in');
        ErrorHandler(res, ResponseCode.UNAUTHORIZED, 'User not logged in');
        return;
      }
      const user = await userService.getCurrentUser(req.session.user.email);
      SuccessHandler(res, user);
    } catch (error: any) {
      logger.error(`Failed to get current user: ${error.message}`);
      ErrorHandler(res, ResponseCode.USER_NOT_FOUND, error.message);
    }
  }

  // update current logged in user info
  async updateUserProfile(req: RequestWithSession, res: Response): Promise<void> {
    try {
      if (!req.session.user?.email) {
        logger.error('User not logged in');
        ErrorHandler(res, ResponseCode.UNAUTHORIZED, 'User not logged in');
        return;
      }
      const user = await userService.updateUserProfile(req.session.user.email, req.body);
      SuccessHandler(res, user);
    } catch (error: any) {
      logger.error(`Failed to update user profile: ${error.message}`);
      ErrorHandler(res, ResponseCode.USER_UPDATE_FAILED, error.message);
    }
  }

  // admin get all users
  async getAllUsers(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      SuccessHandler(res, users);
    } catch (error: any) {
      logger.error(`Failed to get all users: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_ALL_USERS_FAILED, error.message);
    }
  }
}

export const userController = new UserController();