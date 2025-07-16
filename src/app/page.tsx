'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'

export default function LandingPage() {
  const router = useRouter()
  const { user, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogin = () => {
    router.push('/login')
  }

  const handleOpenManager = () => {
    if (user) {
      router.push('/manager')
    } else {
      router.push('/login?redirect=/manager')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Vibin</h1>
              <span className="ml-2 text-sm text-gray-500">by Avinya</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    Welcome, {user.name || user.username}!
                  </span>
                  <Button onClick={handleOpenManager}>
                    Open Manager
                  </Button>
                </div>
              ) : (
                <Button onClick={handleLogin}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Vibin</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your ultimate vibe coding tool with AI integration. Manage projects, track progress,
            and stay in the flow with intelligent assistance.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={handleOpenManager}>
              {user ? 'Open Manager' : 'Get Started'}
            </Button>
            {!user && (
              <Button variant="outline" size="lg" onClick={handleLogin}>
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 Project Management
              </CardTitle>
              <CardDescription>
                Organize and track your development projects with ease
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Create, manage, and monitor projects with features, bugs, tasks, and more.
                Keep everything organized in one place.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🤖 AI Integration
              </CardTitle>
              <CardDescription>
                Intelligent assistance for your coding workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get AI-powered suggestions, code analysis, and project insights
                to boost your productivity and code quality.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Vibe Coding
              </CardTitle>
              <CardDescription>
                Stay in the flow with intuitive tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Designed for developers who want to maintain their coding flow
                with minimal interruptions and maximum efficiency.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to start vibing?
          </h2>
          <p className="text-gray-600 mb-6">
            Join developers who are already using Vibin to manage their projects and boost productivity.
          </p>
          <Button size="lg" onClick={handleOpenManager}>
            {user ? 'Open Manager' : 'Get Started Now'}
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Vibin by Avinya. Built for developers, by developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
