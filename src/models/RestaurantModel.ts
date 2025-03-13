import mongoose, { Schema, Document } from 'mongoose';
import { Category, CATEGORIES, Campus, CAMPUSES, DayOfWeek, DAYS_OF_WEEK } from '../utils/constants';

interface IOpenTime {
  dayOfWeek: DayOfWeek;
  openTime: number;
  closeTime: number;
}

const OpenTimeSchema = new Schema({
    dayOfWeek: {
      type: String,
      enum: Object.values(DAYS_OF_WEEK),
      required: true
    },
    openTime: {
      type: Number,
      required: true
    },
    closeTime: {
      type: Number,
      required: true
    }
}, { _id: false });

export interface IRestaurant extends Document {
  name: string;
  description: string;
  category: Category;
  campus: Campus;

  address: string;
  priceRange: number[];
  phone: string;
  imagesUrl: string[];
  rating: number;

  openTime: IOpenTime[];

  createdAt: Date;
  updatedAt: Date;
}

const RestaurantSchema = new Schema({
  name: { 
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: Object.values(CATEGORIES),
    index: true
  },
  campus: {
    type: String,
    required: true,
    enum: Object.values(CAMPUSES),
    index: true
  },
  address: {
    type: String,
    required: true,
  },
  priceRange: {
    type: [Number],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  imagesUrl: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    default: 0
  },
  openTime: {
    type: [OpenTimeSchema],
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema); 