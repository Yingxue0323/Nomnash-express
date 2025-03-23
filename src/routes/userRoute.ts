import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMW';

const router = Router();

router.get('/profile', authMiddleware, userController.getUserProfile);
router.patch('/profile', authMiddleware, userController.updateUserProfile);

// admin get all users
router.get('/', adminMiddleware, userController.getAllUsers);

export default router; 