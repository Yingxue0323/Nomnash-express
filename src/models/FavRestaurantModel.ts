import mongoose, { Schema, Document } from 'mongoose';

export interface IFavRestaurant extends Document {
  userId: string;
  restaurantId: string;

  createdAt: Date;
  updatedAt: Date;
}

const FavRestaurantSchema = new Schema({
  userId: { 
    type: String,
    required: true,
    index: true
  },
  restaurantId: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true
});

export default mongoose.model<IFavRestaurant>('FavRestaurant', FavRestaurantSchema); 