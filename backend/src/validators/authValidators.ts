import { z } from 'zod';

const optionalString = z.preprocess(
  (value) => {
    if (typeof value !== 'string') {
      return undefined;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  },
  z.string().optional()
);

export const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(8),
  role: z.enum(['farmer', 'consumer']).default('farmer'),
  walletAddress: optionalString,
  farmName: optionalString,
  location: optionalString,
  phone: optionalString,
  bio: optionalString,
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});
