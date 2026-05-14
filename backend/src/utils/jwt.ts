import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  role: 'farmer' | 'consumer' | 'admin';
}

export const signToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];

  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.verify(token, secret) as JwtPayload;
};
