import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMW';

const router = Router();

// user & business owner
router.get('/profile', authMiddleware, userController.getUserProfile);
router.patch('/profile', authMiddleware, userController.updateUserProfile);

// admin curd
router.get('/', adminMiddleware, userController.getAllUsers);
router.get('/:id', adminMiddleware, userController.getUserById);
router.patch('/:id', adminMiddleware, userController.updateUser);
router.delete('/:id', adminMiddleware, userController.deleteUser);

export default router; 