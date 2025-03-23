import mongoose, { Schema, Document } from 'mongoose';
import { Role, ROLES } from '../utils/constants';

export interface IUser extends Document {
  name: string;
  email: string;
  googleId: string;
  avatar?: string;
  role: Role;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  name: { 
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  avatar: { 
    type: String,
    default: '/public/default_avatar.png'
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER,
    required: true
  },
  lastLoginAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 