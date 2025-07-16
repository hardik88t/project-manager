import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes
const protectedRoutes = ['/manager', '/dashboard', '/api/projects']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get token from cookies (more reliable than Authorization header in middleware)
  const token = request.cookies.get('auth-token')?.value

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // For protected routes with token, let the page handle token validation
  // This avoids JWT verification issues in middleware edge runtime

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match only protected routes for now to debug
     */
    '/manager/:path*',
    '/dashboard/:path*',
  ],
}
