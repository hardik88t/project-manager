import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { generateResetToken, generateResetTokenExpiry } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';

const prisma = new PrismaClient();

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, a password reset link has been sent.' },
        { status: 200 }
      );
    }

    // Generate reset token and expiry
    const resetToken = generateResetToken();
    const resetTokenExpiry = generateResetTokenExpiry();

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send password reset email
    try {
      await sendPasswordResetEmail(email, resetToken, user.name || undefined);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send password reset email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'If an account with that email exists, a password reset link has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}