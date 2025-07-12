'use client';

<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectList } from '@/components/project-list';
import { ProjectDetails } from '@/components/project-details';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);
=======
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
>>>>>>> origin/main
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
<<<<<<< HEAD
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch {
      router.push('/login');
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
=======
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          router.push('/login');
        }
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
>>>>>>> origin/main
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
<<<<<<< HEAD
        <div className="text-lg">Loading...</div>
=======
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
>>>>>>> origin/main
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Project Manager</h1>
          <p className="text-sm text-muted-foreground">Manage and track your development projects</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <User className="h-4 w-4" />
            <span>{user?.name || user?.email}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Project List */}
        <div className="w-full md:w-1/3 border-r bg-muted/10 overflow-y-auto">
          <ProjectList />
        </div>

        <Separator orientation="vertical" className="hidden md:block" />

        {/* Right Panel - Project Details */}
        <div className="flex-1 overflow-y-auto">
          <ProjectDetails />
        </div>
      </div>
=======
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Project Manager</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Welcome!</CardTitle>
                <CardDescription>
                  You are successfully authenticated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Email: {user?.email}
                </p>
                <p className="text-sm text-gray-600">
                  Name: {user?.name}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Manage your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Your projects will appear here
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  Track your tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Your tasks will appear here
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
>>>>>>> origin/main
    </div>
  );
}