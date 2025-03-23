import User from '../models/UserModel';
import { IUser } from '../models/UserModel';

class UserService {
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

  /**
   * Get all users by admin
   * @returns 
   */
  async getAllUsers(): Promise<any> {
    const users = await User.find({}, '-password');
    return users;
  }
}

export const userService = new UserService(); 