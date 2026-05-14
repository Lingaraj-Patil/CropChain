import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    role: 'farmer' | 'consumer' | 'admin';
  };
}

export const protect = (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    next(new AppError('Not authorized, token missing', 401));
    return;
  }

  try {
    const token = header.split(' ')[1];
    req.user = verifyToken(token);
    next();
  } catch {
    next(new AppError('Not authorized, token invalid', 401));
  }
};

export const authorize = (...roles: Array<'farmer' | 'consumer' | 'admin'>) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new AppError('Access denied for this role', 403));
      return;
    }

    next();
  };
};
