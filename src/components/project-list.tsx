'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useProjectStore } from '@/store/projects'
import { ProjectType, ProjectStatus } from '@/types'
import { CreateProjectDialog } from './create-project-dialog'

export function ProjectList() {
  const { projects, selectedProject, setSelectedProject, setProjects } = useProjectStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<ProjectType | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'ALL'>('ALL')
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const loadProjects = useCallback(async () => {
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
    }
  }, [setProjects])

  // Load projects on mount
  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.briefDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'ALL' || project.type === typeFilter
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'PLANNING': return 'bg-blue-100 text-blue-800'
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'COMPLETED': return 'bg-gray-100 text-gray-800'
      case 'ON_HOLD': return 'bg-yellow-100 text-yellow-800'
      case 'ARCHIVED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-800'
      case 'HIGH': return 'bg-orange-100 text-orange-800'
      case 'MEDIUM': return 'bg-blue-100 text-blue-800'
      case 'LOW': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Add Button */}
      <div className="p-4 space-y-4">
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as ProjectType | 'ALL')}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="WEBAPP">Web App</SelectItem>
              <SelectItem value="WEBSITE">Website</SelectItem>
              <SelectItem value="CLI">CLI</SelectItem>
              <SelectItem value="API">API</SelectItem>
              <SelectItem value="MOBILE">Mobile</SelectItem>
              <SelectItem value="DESKTOP">Desktop</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'ALL')}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="PLANNING">Planning</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="ON_HOLD">On Hold</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredProjects.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            {projects.length === 0 ? 'No projects yet. Create your first project!' : 'No projects match your filters.'}
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                selectedProject?.id === project.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium truncate">{project.name}</CardTitle>
                  <Badge className={`text-xs ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {project.briefDescription}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {project.type.replace('_', ' ')}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {project.items.length} items
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <CreateProjectDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
        onProjectCreated={loadProjects}
      />
    </div>
  )
}
