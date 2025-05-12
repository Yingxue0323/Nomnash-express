import User, { IUser } from '../models/UserModel';
import Review, { IReview } from '../models/ReviewModel';
import Restaurant from '../models/RestaurantModel';

class ReviewService {
  // -------------------------------------public-------------------------------------
  async getAllReviews(): Promise<any> {
    const reviews = await Review.find();
    return reviews;
  }

  async getReviewById(id: string): Promise<any> {
    const review = await Review.findById(id);
    return review;
  }

  // -------------------------------------admin-------------------------------------
  /**
   * Get current logged in user info
   * @param email 
   * @returns 
   */
  async getCurrentUser(email: string): Promise<any> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  /**
   * Update current logged in user info
   * @param email 
   * @param profile 
   * @returns 
   */
  async updateUserProfile(email: string, profile: IUser): Promise<any> {
    const user = await User.findOneAndUpdate({ email }, profile, { new: true });
    return user;
  }

  // -------------------------------------admin curd-------------------------------------
  /**
   * Get all users by admin
   * @returns 
   */
  async getAllUsers(): Promise<any> {
    const users = await User.find({}, '-password');
    return users;
  }

  /**
   * Get user by id
   * @param id 
   * @returns 
   */
  async getUserById(id: string): Promise<any> {
    const user = await User.findById(id);
    return user;
  }
  
  async createUser(user: IUser): Promise<any> {
    const newUser = await User.create(user);
    return newUser;
  }

  async updateUser(id: string, user: IUser): Promise<any> {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    return updatedUser;
  }

  async deleteUser(id: string): Promise<any> {
    await User.findByIdAndDelete(id);
  }

  async getReviewsByRestaurantId(id: string): Promise<any> {
    const reviews = await Review.find({ restaurantId: id });
    return reviews;
  }

  async createReview(reviewData: Partial<IReview>): Promise<any> {
    // 验证必要字段
    if (!reviewData.userId || !reviewData.restaurantId || !reviewData.rating || !reviewData.text) {
      throw new Error('Missing required review fields');
    }
    
    // 验证评分范围
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    
    // 创建评论
    const newReview = await Review.create(reviewData);
    return newReview;
  }

  async updateReview(id: string, review: IReview): Promise<any> {
    const updatedReview = await Review.findByIdAndUpdate(id, review, { new: true });
    return updatedReview;
  }

  async deleteReview(id: string): Promise<any> {
    await Review.findByIdAndDelete(id);
  }

  async likeReview(id: string): Promise<any> {
    const review = await Review.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
    return review;
  }

  async unlikeReview(id: string): Promise<any> {
    const review = await Review.findByIdAndUpdate(id, { $inc: { likes: -1 } }, { new: true });
    return review;
  }

  async replyReview(id: string, reply: string): Promise<any> {
    const review = await Review.findByIdAndUpdate(id, { reply }, { new: true });
    return review;
  }

  async updateRestaurantRating(restaurantId: string): Promise<void> {
    // 获取餐厅的所有评论
    const reviews = await Review.find({ restaurantId });
    
    // 如果没有评论，则评分为0
    if (reviews.length === 0) {
      await Restaurant.findByIdAndUpdate(restaurantId, { rating: 0 });
      return;
    }
    
    // 计算平均评分
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = parseFloat((totalRating / reviews.length).toFixed(1));
    
    // 更新餐厅评分
    await Restaurant.findByIdAndUpdate(restaurantId, { rating: averageRating });
  }
}
export const reviewService = new ReviewService(); 