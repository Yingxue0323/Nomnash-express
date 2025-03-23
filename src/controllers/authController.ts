import { Request, Response } from 'express';
import { Session } from 'express-session';
import { authService } from '../services/authService';
import { SuccessHandler, ErrorHandler } from '../utils/response';
import { ResponseCode } from '../utils/constants';
import logger from '../utils/logger';
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

class AuthController {
  async redirectToGoogle(req: Request, res: Response): Promise<void> {
    try {
      const url = authService.getGoogleAuthURL();
      res.redirect(url);
      logger.info(`Redirected to Google: ${url}`);
    } catch (error: any) {
      logger.error(`Failed to redirect to Google: ${error.message}`);
      ErrorHandler(res, ResponseCode.LOGIN_FAILED, error.message);
    }
  }

  async handleGoogleCallback(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const code = req.query.code as string;
      if (!code) {
        throw new Error('Authorization code not provided');
      }

      const { user } = await authService.login(code);
      
      // store user info to session
      req.session.user = {
        email: user.email,
        name: user.name
      };
      
      // redirect to frontend success page
      res.redirect(`${config.url}/api/v1/resturants`);
    } catch (error: any) {
      logger.error(`Google callback failed: ${error.message}`);
      res.redirect(`${config.url}/api/v1/auth/error?message=${error.message}`);
    }
  }

  async logout(req: RequestWithSession, res: Response): Promise<void> {
    try {
      // destroy session
      req.session.destroy((err) => {
        if (err) {
          logger.error(`Failed to destroy session: ${err}`);
          ErrorHandler(res, ResponseCode.LOGOUT_FAILED, 'Failed to destroy session');
        }
        SuccessHandler(res, { message: 'Logged out successfully' });
      });
    } catch (error: any) {
      logger.error(`Logout failed: ${error.message}`);
      ErrorHandler(res, ResponseCode.LOGOUT_FAILED, error.message);
    }
  }
}

export const authController = new AuthController();