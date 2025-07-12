import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createProjectSchema } from '@/lib/validations'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
<<<<<<< HEAD
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
=======
    // Get user ID from headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
>>>>>>> origin/main
        { status: 401 }
      );
    }

    const projects = await prisma.project.findMany({
      where: {
<<<<<<< HEAD
        userId: user.userId
=======
        userId: userId
>>>>>>> origin/main
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
<<<<<<< HEAD
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
=======
    // Get user ID from headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
>>>>>>> origin/main
        { status: 401 }
      );
    }

    const body = await request.json()
    
    // Validate the request body
    const validatedData = createProjectSchema.parse(body)
    
    // Convert arrays to JSON strings for SQLite storage
    const projectData = {
      ...validatedData,
<<<<<<< HEAD
      userId: user.userId,
=======
      userId: userId,
>>>>>>> origin/main
      techStack: JSON.stringify(validatedData.techStack || []),
      tags: JSON.stringify(validatedData.tags || [])
    }

    const project = await prisma.project.create({
      data: projectData,
      include: {
        items: true
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid project data', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
