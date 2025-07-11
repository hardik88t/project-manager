import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createProjectItemSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = createProjectItemSchema.parse(body)
    
    // Convert labels array to JSON string for SQLite storage
    const itemData = {
      ...validatedData,
      labels: JSON.stringify(validatedData.labels || [])
    }

    const projectItem = await prisma.projectItem.create({
      data: itemData
    })

    return NextResponse.json(projectItem, { status: 201 })
  } catch (error) {
    console.error('Failed to create project item:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid project item data', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create project item' },
      { status: 500 }
    )
  }
}
