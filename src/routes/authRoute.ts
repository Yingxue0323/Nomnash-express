import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMW';

const router = Router();

router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.delete('/logout', authController.logout);

export default router; 