import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
<<<<<<< HEAD
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
=======
import { z } from 'zod';
import { hashPassword, generateVerificationToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = signupSchema.parse(body);
>>>>>>> origin/main

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: 'User already exists' },
=======
        { error: 'User with this email already exists' },
>>>>>>> origin/main
        { status: 400 }
      );
    }

    // Hash password
<<<<<<< HEAD
    const hashedPassword = await bcrypt.hash(password, 12);
=======
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = generateVerificationToken();
>>>>>>> origin/main

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
<<<<<<< HEAD
        password: hashedPassword,
        name: name || null,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unused, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
=======
        name,
        password: hashedPassword,
        verificationToken,
      },
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken, name);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail the signup if email fails
    }

    return NextResponse.json(
      { 
        message: 'User created successfully. Please check your email to verify your account.',
        userId: user.id 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

>>>>>>> origin/main
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}