import { Request, Response } from 'express';
import { Session } from 'express-session';
import { restaurantService } from '../services/restaurantService';
import { SuccessHandler, ErrorHandler } from '../utils/response';
import { ResponseCode } from '../utils/constants';
import logger from '../utils/logger';
import { config } from '../configs/index';
import { Category } from '../utils/constants';

interface RequestWithSession extends Request {
  session: Session & {
    user?: {
      email: string;
      name: string;
      isAdmin?: boolean;
    }
  }
}

class RestaurantController {
  // -------------------------------------public-------------------------------------
  async getRestaurants(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const restaurants = await restaurantService.getRestaurants();
      SuccessHandler(res, restaurants);
    } catch (error: any) {
      logger.error(`Failed to get all restaurants: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_ALL_RESTAURANTS_FAILED, error.message);
    }
  }

  async getRestaurantsByFilter(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const rating = req.query.rating as number | undefined;
      const category = req.query.category ? Number(req.query.category as string) : undefined;
      const priceRange = Array.isArray(req.query.priceRange) && req.query.priceRange.length > 0 
          ? Number(req.query.priceRange[0]) 
          : undefined;
      
    
      const restaurants = await restaurantService.getRestaurants(rating, priceRange, category);
      SuccessHandler(res, restaurants);
    } catch (error: any) {
      logger.error(`Failed to get restaurants by filter: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_ALL_RESTAURANTS_FAILED, error.message);
    }
  }

  async getRestaurantById(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const restaurant = await restaurantService.getRestaurantById(req.params.id);
      SuccessHandler(res, restaurant);
    } catch (error: any) {
      logger.error(`Failed to get restaurant by id: ${error.message}`);
      ErrorHandler(res, ResponseCode.GET_RESTAURANT_BY_ID_FAILED, error.message);
    }
  }

  // -------------------------------------owner curd-------------------------------------
  async createRestaurant(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const restaurant = await restaurantService.createRestaurant(req.body);
      SuccessHandler(res, restaurant);
    } catch (error: any) {
      logger.error(`Failed to create restaurant: ${error.message}`);
      ErrorHandler(res, ResponseCode.RESTAURANT_CREATION_FAILED, error.message);
    }
  }

  async updateRestaurant(req: RequestWithSession, res: Response): Promise<void> {
    try {
      const restaurant = await restaurantService.updateRestaurant(req.params.id, req.body);
      SuccessHandler(res, restaurant);
    } catch (error: any) {
      logger.error(`Failed to update restaurant: ${error.message}`);
      ErrorHandler(res, ResponseCode.RESTAURANT_UPDATE_FAILED, error.message);
    }
  }

  async deleteRestaurant(req: RequestWithSession, res: Response): Promise<void> {
    try {
      await restaurantService.deleteRestaurant(req.params.id);
      SuccessHandler(res, 'Restaurant deleted successfully');
    } catch (error: any) {
      logger.error(`Failed to delete restaurant: ${error.message}`);
      ErrorHandler(res, ResponseCode.RESTAURANT_DELETION_FAILED, error.message);
    }
  }
}
export const restaurantController = new RestaurantController();