import { Router } from 'express';
import { restaurantController } from '../controllers/restaurantController';
import { authMiddleware, adminMiddleware, ownerMiddleware } from '../middlewares/authMW';

const router = Router();

// public: All users (guests) can read the restaurant list and details
router.get('/', restaurantController.getRestaurants);
router.get('/filter', restaurantController.getRestaurantsByFilter);
router.get('/:id', restaurantController.getRestaurantById);

// owner: Only the owner can create, update, or delete a restaurant
router.post('/', ownerMiddleware, restaurantController.createRestaurant);
router.patch('/:id', ownerMiddleware, restaurantController.updateRestaurant);
router.delete('/:id', ownerMiddleware, restaurantController.deleteRestaurant);

export default router; 