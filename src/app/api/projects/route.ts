import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createProjectSchema } from '@/lib/validations'
import { getTokenFromRequest, getUserFromToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id
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
    // Check authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const body = await request.json()

    // Validate the request body
    const validatedData = createProjectSchema.parse(body)

    // Convert arrays to JSON strings for PostgreSQL storage
    const projectData = {
      ...validatedData,
      userId: user.id, // Associate project with authenticated user
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
