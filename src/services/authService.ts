import axios from 'axios';
import User from '../models/UserModel';
import dotenv from 'dotenv';

dotenv.config();

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

class AuthService {
  /**
   * Login with Google OAuth
   * Flow:
   * 1. Get authorization code from Google callback
   * 2. Exchange code for access token and ID token
   * 3. Get user info from Google using tokens
   * 4. Find or create user in database
   * @param code - Authorization code from Google callback
   * @returns User object
   */
  async login(code: string): Promise<any> {
    try {
      // 1. Exchange authorization code for tokens
      const { id_token, access_token } = await this.getGoogleOAuthTokens(code);
      
      // 2. Get user info from Google using tokens
      const googleUser = await this.getGoogleUser(id_token, access_token);

      // 3. Find or create user in database
      let user = await User.findOne({ email: googleUser.email });
      if (!user) {
        // Create new user if not exists
        user = await User.create({
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.picture,
          googleId: googleUser.id,
          lastLoginAt: new Date(),
        });
      }

      return { user };
    } catch (error: any) {
      throw new Error(`Failed to login with Google: ${error.message}`);
    }
  }

  /**
   * Get Google OAuth tokens
   * - Post code to Google OAuth API to get tokens
   * @param code 
   * @returns 
   */
  private async getGoogleOAuthTokens(code: string): Promise<GoogleTokensResult> {
    const url = 'https://oauth2.googleapis.com/token';
    
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error('Required environment variables are not set');
    }

    const values = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };

    try {
      const res = await axios.post<GoogleTokensResult>(
        url,
        new URLSearchParams(values).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Get Google user info
   * - Get user info from Google OAuth API
   * @param id_token 
   * @param access_token 
   * @returns 
   */
  private async getGoogleUser(
    id_token: string,
    access_token: string
  ): Promise<GoogleUserResult> {
    try {
      const res = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Get Google OAuth URL
   * @returns 
   */
  getGoogleAuthURL(): string {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      throw new Error('Required environment variables are not set');
    }

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: redirectUri,
      client_id: clientId,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    const qs = new URLSearchParams(options);
    return `${rootUrl}?${qs.toString()}`;
  }
}

export const authService = new AuthService();