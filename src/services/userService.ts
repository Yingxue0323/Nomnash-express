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
}

export const userService = new UserService(); 