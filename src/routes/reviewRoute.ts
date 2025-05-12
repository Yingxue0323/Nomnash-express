import { Router } from 'express';
import { reviewController } from '../controllers/reviewController';
import { authMiddleware, adminMiddleware, ownerMiddleware } from '../middlewares/authMW';

const router = Router();

// public: All users (guests) can read the review list and details
router.get('/', reviewController.getReviewsByRestaurant);

// user (not allowed to update review)
router.post('/restaurant/:restaurantId', authMiddleware, reviewController.createReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);
router.post('/:id/like', authMiddleware, reviewController.likeReview);
router.delete('/:id/unlike', authMiddleware, reviewController.unlikeReview);

// owner: Only the owner can reply to a review
router.post('/:id/reply', ownerMiddleware, reviewController.replyReview);

// admin curd
router.get('/', adminMiddleware, reviewController.getAllReviews);
router.get('/:id', adminMiddleware, reviewController.getReviewById);
router.post('/', adminMiddleware, reviewController.createReviewAdmin);
router.patch('/:id', adminMiddleware, reviewController.updateReviewAdmin);
router.delete('/:id', adminMiddleware, reviewController.deleteReviewAdmin);  

export default router; 