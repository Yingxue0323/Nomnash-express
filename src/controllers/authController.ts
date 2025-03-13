import { Request, Response } from 'express';
import { authService } from '../services/authService';
import { SuccessHandler, ErrorHandler } from '../utils/response';
import { ResponseCode } from '../utils/constants';
import logger from '../utils/logger';

class AuthController {
  async login(req: Request, res: Response): Promise<any> {
    try {
      const { code } = req.body;
      const { user, token } = await authService.login(code);

      logger.info(`Login success: ${user._id}`);
      return SuccessHandler(res, { user, token });
    } catch (error: any) {
      logger.error(`Login failed: ${JSON.stringify({ error: error.message })}`);
      return ErrorHandler(res, ResponseCode.LOGIN_FAILED, error.message);
    }
  };

  async refreshToken(req: Request, res: Response): Promise<any> {
    try {
      const { code } = req.body;
      const { token } = await authService.refreshToken(code);

      logger.info(`Refresh token success: ${token}`);
      return SuccessHandler(res, { token });
      
    } catch (error: any) {
      logger.error(`Refresh token failed: ${JSON.stringify({ error: error.message })}`);
      return ErrorHandler(res, ResponseCode.TOKEN_REFRESH_FAILED, error.message);
    }
  }

  async logout(req: Request, res: Response): Promise<any> {
    try {
      const result = await authService.logout(req.body.email);

      logger.info(`Logout success: ${req.body.email}`);
      return SuccessHandler(res, { result });
    } catch (error: any) {
      logger.error(`Logout failed: ${JSON.stringify({ error: error.message })}`);
      return ErrorHandler(res, ResponseCode.LOGOUT_FAILED, error.message);
    }
  }
} 

export const authController = new AuthController();