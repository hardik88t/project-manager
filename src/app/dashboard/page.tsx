'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/dashboard')
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vibin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user.name || user.username}!</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleGoHome} variant="outline">
                Home
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vibin Manager</CardTitle>
                <CardDescription>
                  Manage and track all your development projects with AI insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => router.push('/manager')}
                  className="w-full"
                >
                  Open Vibin Manager
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>
                  Overview of your projects and tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">Coming Soon</div>
                <p className="text-sm text-gray-600">Project statistics will be displayed here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Get intelligent coding assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">Coming Soon</div>
                <p className="text-sm text-gray-600">AI integration features will be available here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates from your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">Coming Soon</div>
                <p className="text-sm text-gray-600">Recent activity will be displayed here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Code Analytics</CardTitle>
                <CardDescription>
                  Insights into your coding patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">Coming Soon</div>
                <p className="text-sm text-gray-600">Code analytics and insights coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Work together with your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">Coming Soon</div>
                <p className="text-sm text-gray-600">Team features will be available soon</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
