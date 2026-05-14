import { Schema, model, Document } from 'mongoose';

export type UserRole = 'farmer' | 'consumer' | 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  walletAddress?: string;
  farmName?: string;
  location?: string;
  phone?: string;
  bio?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['farmer', 'consumer', 'admin'], default: 'farmer' },
    walletAddress: { type: String, trim: true },
    farmName: { type: String, trim: true },
    location: { type: String, trim: true },
    phone: { type: String, trim: true },
    bio: { type: String, trim: true },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
