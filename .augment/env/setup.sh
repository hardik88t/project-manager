#!/bin/bash

cd /mnt/persist/workspace

# Create signup page using the working method
mkdir -p src/app/auth/signup && echo "'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { useAuthStore } from '@/store/auth'
import { Folder, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signup, isLoading, error, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/manager')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    const success = await signup(name || undefined, email, password)
    if (success) {
      toast.success('Account created successfully!')
      router.push('/manager')
    } else {
      toast.error(error || 'Signup failed')
    }
  }

  return (
    <div className=\"min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4\">
      <div className=\"w-full max-w-md\">
        <div className=\"flex items-center justify-between mb-8\">
          <Link href=\"/\" className=\"flex items-center space-x-2\">
            <Folder className=\"h-6 w-6\" />
            <span className=\"font-bold text-xl\">Project Manager</span>
          </Link>
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader className=\"space-y-1\">
            <CardTitle className=\"text-2xl font-bold text-center\">Create an account</CardTitle>
            <CardDescription className=\"text-center\">
              Enter your information to get started with project management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className=\"space-y-4\">
              <div className=\"space-y-2\">
                <Label htmlFor=\"name\">Name (optional)</Label>
                <Input
                  id=\"name\"
                  type=\"text\"
                  placeholder=\"Enter your name\"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=\"space-y-2\">
                <Label htmlFor=\"email\">Email</Label>
                <Input
                  id=\"email\"
                  type=\"email\"
                  placeholder=\"Enter your email\"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className=\"space-y-2\">
                <Label htmlFor=\"password\">Password</Label>
                <div className=\"relative\">
                  <Input
                    id=\"password\"
                    type={showPassword ? 'text' : 'password'}
                    placeholder=\"Create a password\"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type=\"button\"
                    variant=\"ghost\"
                    size=\"sm\"
                    className=\"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent\"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}
                  </Button>
                </div>
              </div>
              <div className=\"space-y-2\">
                <Label htmlFor=\"confirmPassword\">Confirm Password</Label>
                <div className=\"relative\">
                  <Input
                    id=\"confirmPassword\"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder=\"Confirm your password\"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type=\"button\"
                    variant=\"ghost\"
                    size=\"sm\"
                    className=\"absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent\"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className=\"h-4 w-4\" /> : <Eye className=\"h-4 w-4\" />}
                  </Button>
                </div>
              </div>

              <Button type=\"submit\" className=\"w-full\" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className=\"mt-6 text-center text-sm\">
              Already have an account?{' '}
              <Link href=\"/auth/login\" className=\"text-primary hover:underline\">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}" > src/app/auth/signup/page.tsx

echo "Signup page created"