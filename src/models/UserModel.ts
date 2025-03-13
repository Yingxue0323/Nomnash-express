import mongoose, { Schema, Document } from 'mongoose';
import { Role, ROLES } from '../utils/constants';

export interface IUser extends Document {
  username: string;
  pswd: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  

  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  username: { 
    type: String
  },
  pswd: {
    type: String
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  avatarUrl: { 
    type: String,
    default: '/public/default_avatar.png'
  },
  role:{
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER,
    required: true
  },

  // VIP Status
  isVIP: {
    type: Boolean,
    default: false
  },
  vipExpireAt: {
    type: Date,
    default: null
  },
  redeem: {
    type: String,
    default: null
  },
  lastLoginAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 