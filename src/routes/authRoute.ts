import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMW';

const router = Router();

router.get('/login', authController.redirectToGoogle);
router.get('/callback', authController.handleGoogleCallback);
router.delete('/logout', authMiddleware, authController.logout);

export default router; 