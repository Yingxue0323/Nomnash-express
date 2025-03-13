import mongoose from 'mongoose';
import logger from '../utils/logger';

export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    logger.error('Error: MONGODB_URI is not set');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('MongoDB Atlas connected successfully');
  } catch (error: any) {
    logger.error(`MongoDB Atlas connection failed: ${JSON.stringify({ error: error.message })}`);
    process.exit(1);
  }
};