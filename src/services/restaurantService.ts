import User from '../models/UserModel';
import { reviewService } from './reviewService';
import Restaurant, { IRestaurant } from '../models/RestaurantModel';
import { ErrorHandler, SuccessHandler } from '../utils/response';
import logger from '../utils/logger';
import { ResponseCode } from '../utils/constants';

class RestaurantService {
  // -------------------------------------public-------------------------------------
  /**
   * Get all restaurants
   * @returns List of filtered restaurants
   */
  async getRestaurants(page?: number, pageSize?: number, rating?: number, priceRange?: number[], category?: string): Promise<any> {
    // page
    if (!page) page = 1;
    if (!pageSize) pageSize = 25;
    const skip = (page - 1) * pageSize;

    // filter
    const query: any = {};
    if (rating) query.rating = { $gte: rating };
    if (priceRange) query.priceRange = { $in: priceRange };
    if (category) query.category = { $in: category };

    // look up
    const restaurants = await Restaurant.find(query).sort({ rating: -1 }).skip(skip).limit(pageSize);
    if (!restaurants) throw new Error('No restaurants found');

    // Filter out restaurants that are not active
    const restaurantList = restaurants.map((restaurant) => {
      return {
        _id: restaurant._id,
        name: restaurant.name,
        description: restaurant.description,
        category: restaurant.category,
        campus: restaurant.campus,
        address: restaurant.address,
        priceRange: restaurant.priceRange,
        phone: restaurant.phone,
        imagesUrl: restaurant.imagesUrl,
        rating: restaurant.rating,
        openTime: restaurant.openTime,
      };
    });
    return restaurantList;
  }


  async getRestaurantById(id: string): Promise<any> {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) throw new Error('Restaurant not found');
    return restaurant;
  }

  async createRestaurant(restaurant: IRestaurant): Promise<any> {
    const newRestaurant = await Restaurant.create(restaurant);
    return newRestaurant;
  }

  async updateRestaurant(id: string, restaurant: IRestaurant): Promise<any> {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, restaurant, { new: true });
    return updatedRestaurant;
  }

  async deleteRestaurant(id: string): Promise<any> {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
    return deletedRestaurant;
  }
}

export const restaurantService = new RestaurantService(); 