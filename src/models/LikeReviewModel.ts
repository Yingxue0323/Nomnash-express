import mongoose, { Schema, Document } from 'mongoose';

export interface ILikeReview extends Document {
  userId: string;
  reviewId: string;

  createdAt: Date;
  updatedAt: Date;
}

const LikeReviewSchema = new Schema({
  userId: { 
    type: String,
    required: true,
    index: true
  },
  reviewId: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ILikeReview>('LikeReview', LikeReviewSchema); 