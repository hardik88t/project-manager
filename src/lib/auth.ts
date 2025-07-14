<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
=======
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';
>>>>>>> origin/main

export interface JWTPayload {
  userId: string;
  email: string;
}

<<<<<<< HEAD
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
=======
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateJWT = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyJWT = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
};

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateResetTokenExpiry = (): Date => {
  return new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
};
>>>>>>> origin/main
