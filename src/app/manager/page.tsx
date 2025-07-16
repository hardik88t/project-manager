'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectList } from '@/components/project-list'
import { ProjectDetails } from '@/components/project-details'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'

export default function ManagerPage() {
  const router = useRouter()
  const { user, logout, checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/manager')
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const handleGoHome = () => {
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="flex h-screen">
      {/* Left Panel - Project List */}
      <div className="w-1/3 border-r bg-muted/10">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Vibin Manager</h1>
            <div className="flex gap-2">
              <Button onClick={handleGoHome} variant="outline" size="sm">
                Home
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage and track your development projects with AI-powered insights
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Logged in as: {user.name || user.username}
          </p>
        </div>
        <ProjectList />
      </div>

      <Separator orientation="vertical" />

      {/* Right Panel - Project Details */}
      <div className="flex-1">
        <ProjectDetails />
      </div>
    </div>
  )
}
