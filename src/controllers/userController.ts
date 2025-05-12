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

  // -------------------------------------admin curd-------------------------------------
  async getAllUsers(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      SuccessHandler(res, users);
    } catch (error: any) {
      logger.error(`Failed to get all users: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_ALL_USERS_FAILED, error.message);
    }
  }

  async getUserById(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      SuccessHandler(res, user);
    } catch (error: any) {
      logger.error(`Failed to get user by id: ${error.message}`);
      ErrorHandler(res, ResponseCode.USER_NOT_FOUND, error.message);
    }
  }

  async createUser(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const user = await userService.createUser(req.body);
      SuccessHandler(res, user);
    } catch (error: any) {
      logger.error(`Failed to create user: ${error.message}`);
      ErrorHandler(res, ResponseCode.USER_CREATION_FAILED, error.message);
    }
  } 

  async updateUser(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      SuccessHandler(res, user);
    } catch (error: any) {
      logger.error(`Failed to update user: ${error.message}`);
      ErrorHandler(res, ResponseCode.USER_UPDATE_FAILED, error.message);
    }
  } 

  async deleteUser(req: RequestWithSession, res: Response): Promise<void> {
    try {
      await userService.deleteUser(req.params.id);
      SuccessHandler(res, 'User deleted successfully');
    } catch (error: any) {
      logger.error(`Failed to delete user: ${error.message}`);
      ErrorHandler(res, ResponseCode.USER_DELETION_FAILED, error.message);
    }
  }
}
export const userController = new UserController();