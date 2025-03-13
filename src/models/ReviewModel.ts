import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  userId: string;
  restaurantId: string;

  rating: number;
  text: string;
  imagesUrl: string[];

  //reply
  reply: string;
  replyAt: Date;
  replyBy: string; // restaurantId

  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema({
  userId: { 
    type: String,
    required: true,
    index: true
  },
  restaurantId: {
    type: String,
    required: true,
    index: true
  },
  // Rating
  rating: {
    type: Number,
    required: true,
    default: 5
  },
  text: { 
    type: String,
    required: true
  },
  imagesUrl: {
    type: [String],
    required: true
  },
  // reply
  reply: {
    type: String,
    default: ''
  },
  replyAt: {
    type: Date,
    default: null
  },
  replyBy: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model<IReview>('Review', ReviewSchema); 