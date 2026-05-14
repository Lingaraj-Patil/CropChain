import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';
import { signToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middleware/auth';

const createTokenResponse = (userId: string, role: 'farmer' | 'consumer' | 'admin') => ({
  token: signToken({ userId, role }),
});

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role, walletAddress, farmName, location, phone, bio } = req.body;
  const normalizedEmail = String(email).trim().toLowerCase();

  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    throw new AppError('User already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email: normalizedEmail,
    password: hashedPassword,
    role,
    walletAddress,
    farmName,
    location,
    phone,
    bio,
  });

  const token = createTokenResponse(String(user._id), user.role);

  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        farmName: user.farmName,
        location: user.location,
      },
      ...token,
    },
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const normalizedEmail = String(email).trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = createTokenResponse(String(user._id), user.role);

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress,
        farmName: user.farmName,
        location: user.location,
      },
      ...token,
    },
  });
};

export const me = async (req: Request, res: Response): Promise<void> => {
  const authRequest = req as AuthenticatedRequest;
  const userId = authRequest.user?.userId;

  if (!userId) {
    throw new AppError('Unauthorized', 401);
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json({ success: true, data: { user } });
};
