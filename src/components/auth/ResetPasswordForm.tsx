'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, AlertCircle, ArrowLeft } from 'lucide-react';

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Reset token is missing');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password reset failed');
      }

      setSuccess(data.message);
      setFormData({
        password: '',
        confirmPassword: '',
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Invalid reset link. Please request a new password reset.</AlertDescription>
          </Alert>
          <div className="text-center mt-4">
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => router.push('/forgot-password')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to forgot password
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>

          <div className="text-center text-sm">
            <Button
              variant="link"
              className="p-0 h-auto font-semibold"
              onClick={() => router.push('/login')}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}