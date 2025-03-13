// import { userService } from '../services/userService';
import { generateToken } from '../utils/jwt';
import { IUser } from '../models/UserModel';
import User from '../models/UserModel';

class AuthService {
  async login(email: string): Promise<any> {
    // 1. TODO:google login api

    // 2. find or create user
    // let user = await User.findOne({ email: email }) as IUser;

    // if (!user) { // 3a. create new user
    //   const { user: newUser, token } = await userService.createUser(email, session_key);
    //   return { user: newUser, token };
    // }

    // // 3b. update user info
    // user = await userService.updateSessionKey(email, session_key);
    // const token = generateToken(user.email);

    // return { user, token };
  }


  // refresh token
  async refreshToken(email: string): Promise<any> {
    // 1. TODO:google login api
    
    // 2. update user session key
    // const user = await userService.updateSessionKey(email, session_key);
    
    // // 3. generate new token
    // const token = generateToken(user.email);
    
    // return { token };
  }

  async logout(email: string): Promise<any> {
    // 1. TODO:google login api
    
    // 2. clear user session
    // const result = await userService.clearSession(email);
    // return result;
  }
}

export const authService = new AuthService();