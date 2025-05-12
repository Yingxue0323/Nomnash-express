import { Request, Response } from 'express';
import { Session } from 'express-session';
import { reviewService } from '../services/reviewService';
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

class ReviewController {
  // -------------------------------------public-------------------------------------
  async getReviewsByRestaurant(req: RequestWithSession, res: Response): Promise<void> {
    try {
      // 确保提供餐厅ID
      const restaurantId = req.params.restaurantId;
      const reviews = await reviewService.getReviewsByRestaurantId(restaurantId);
      SuccessHandler(res, reviews);
    } catch (error: any) {
      logger.error(`Failed to get reviews by restaurant id: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_REVIEW_BY_RESTAURANT_FAILED, error.message);
    }
  }

  // -------------------------------------user-------------------------------------
  async createReview(req: RequestWithSession, res: Response): Promise<void> {
    try {
      // 确保用户已登录
      if (!req.session.user || !req.session.user.email) {
        ErrorHandler(res, ResponseCode.UNAUTHORIZED, 'User not logged in');
        return;
      }

      // 获取当前用户
      const user = await reviewService.getCurrentUser(req.session.user.email);
      
      // 创建评论对象
      const reviewData = {
        userId: user._id,
        restaurantId: req.params.restaurantId,
        rating: req.body.rating,
        text: req.body.text,
        imagesUrl: req.body.imagesUrl || []
      };

      // 创建评论
      const review = await reviewService.createReview(reviewData);
      
      // 更新餐厅平均评分
      await reviewService.updateRestaurantRating(req.params.restaurantId);
      
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to create review: ${error.message}`);
      ErrorHandler(res, ResponseCode.REVIEW_CREATION_FAILED, error.message);
    }
  }

  async deleteReview(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const review = await reviewService.deleteReview(req.params.id);
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to delete review: ${error.message}`);
      ErrorHandler(res, ResponseCode.REVIEW_DELETION_FAILED, error.message);
    }
  }
  
  async likeReview(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const review = await reviewService.likeReview(req.params.id);
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to like review: ${error.message}`);
      ErrorHandler(res, ResponseCode.LIKE_REVIEW_FAILED, error.message);
    }
  }

  async unlikeReview(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const review = await reviewService.unlikeReview(req.params.id);
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to unlike review: ${error.message}`);
      ErrorHandler(res, ResponseCode.UNLIKE_REVIEW_FAILED, error.message);
    }
  } 

  // -------------------------------------owner-------------------------------------
  async replyReview(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const review = await reviewService.replyReview(req.params.id, req.body);
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to reply review: ${error.message}`);
      ErrorHandler(res, ResponseCode.REVIEW_REPLY_FAILED, error.message);
    }
  }

  // -------------------------------------admin-------------------------------------
  async getAllReviews(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const reviews = await reviewService.getAllReviews();
      SuccessHandler(res, reviews);
    } catch (error: any) {
      logger.error(`Failed to get all reviews: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_ALL_REVIEWS_FAILED, error.message);
    }
  }

  async getReviewById(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const review = await reviewService.getReviewById(req.params.id);
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to get review by id: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_REVIEW_BY_ID_FAILED, error.message);
    }
  }

  async createReviewAdmin(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const review = await reviewService.createReview(req.body);
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to create review: ${error.message}`);
      ErrorHandler(res, ResponseCode.REVIEW_CREATION_FAILED, error.message);
    }
  }

  async updateReviewAdmin(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const review = await reviewService.updateReview(req.params.id, req.body);
      SuccessHandler(res, review);
    } catch (error: any) {
      logger.error(`Failed to update review: ${error.message}`);
      ErrorHandler(res, ResponseCode.REVIEW_UPDATE_FAILED, error.message);
    }
  }

  async deleteReviewAdmin(req: RequestWithSession, res: Response): Promise<void> {
    try {
      await reviewService.deleteReview(req.params.id);
      SuccessHandler(res, 'Review deleted successfully');
    } catch (error: any) {
      logger.error(`Failed to delete review: ${error.message}`);
      ErrorHandler(res, ResponseCode.REVIEW_DELETION_FAILED, error.message);
    }
  }
}
export const reviewController = new ReviewController();