import { z } from 'zod'
import { ProjectType, ProjectStatus, ProjectItemType, ItemStatus, Priority } from '@prisma/client'

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  type: z.nativeEnum(ProjectType),
  status: z.nativeEnum(ProjectStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  briefDescription: z.string().min(1, 'Brief description is required').max(500, 'Brief description must be less than 500 characters'),
  detailedDescription: z.string().max(2000, 'Detailed description must be less than 2000 characters').optional(),
  liveUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  localPath: z.string().max(200, 'Local path must be less than 200 characters').optional(),
  techStack: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([])
})

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().min(1, 'ID is required')
})

export const createProjectItemSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  type: z.nativeEnum(ProjectItemType).optional(),
  status: z.nativeEnum(ItemStatus).optional(),
  priority: z.nativeEnum(Priority).optional(),
  labels: z.array(z.string()).default([])
})

export const updateProjectItemSchema = createProjectItemSchema.partial().extend({
  id: z.string().min(1, 'ID is required')
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type CreateProjectItemInput = z.infer<typeof createProjectItemSchema>
export type UpdateProjectItemInput = z.infer<typeof updateProjectItemSchema>
