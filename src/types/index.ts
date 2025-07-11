import { Project, ProjectItem, ProjectType, ProjectStatus, ProjectItemType, ItemStatus, Priority } from '@prisma/client'

export type {
  Project,
  ProjectItem,
  ProjectType,
  ProjectStatus,
  ProjectItemType,
  ItemStatus,
  Priority
}

export interface ProjectWithItems extends Project {
  items: ProjectItem[]
}

export interface CreateProjectData {
  name: string
  type: ProjectType
  status?: ProjectStatus
  priority?: Priority
  briefDescription: string
  detailedDescription?: string
  liveUrl?: string
  githubUrl?: string
  localPath?: string
  techStack: string[]
  tags: string[]
}

export interface CreateProjectItemData {
  projectId: string
  name: string
  description?: string
  type?: ProjectItemType
  status?: ItemStatus
  priority?: Priority
  labels?: string[]
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string
}

export interface UpdateProjectItemData extends Partial<CreateProjectItemData> {
  id: string
}
