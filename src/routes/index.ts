import { Express } from 'express';
import authRoute from './authRoute';
import userRoute from './userRoute';
import restaurantRoute from './restaurantRoute';
import reviewRoute from './reviewRoute';
// import staticRoute from './staticRoute';


export function registerRoutes(app: Express) {
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/restaurants', restaurantRoute);
  app.use('/api/v1/reviews', reviewRoute);
}