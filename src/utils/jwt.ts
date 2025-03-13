import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../configs';
import { Secret } from 'jsonwebtoken';

interface JwtPayload {
  email: string;
  exp?: number;
  iat?: number;
}

export const generateToken = (email: string): string => {
  return jwt.sign(
    { email },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expiresIn } as SignOptions
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
}; 