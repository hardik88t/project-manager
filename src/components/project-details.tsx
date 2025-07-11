'use client'

import { useState } from 'react'
import { ExternalLink, Github, Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useProjectStore } from '@/store/projects'
import { ProjectItemType, ItemStatus, Priority } from '@/types'
import { CreateItemDialog } from './create-item-dialog'

export function ProjectDetails() {
  const { selectedProject } = useProjectStore()
  const [showCreateItemDialog, setShowCreateItemDialog] = useState(false)

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">No Project Selected</h3>
          <p className="text-sm">Select a project from the list to view details</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO': return 'bg-gray-100 text-gray-800'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800'
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'BLOCKED': return 'bg-red-100 text-red-800'
      case 'CANCELLED': return 'bg-yellow-100 text-yellow-800'
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FEATURE': return 'bg-green-100 text-green-800'
      case 'BUG': return 'bg-red-100 text-red-800'
      case 'IMPROVEMENT': return 'bg-blue-100 text-blue-800'
      case 'TASK': return 'bg-purple-100 text-purple-800'
      case 'RESEARCH': return 'bg-yellow-100 text-yellow-800'
      case 'DOCUMENTATION': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const techStack = selectedProject.techStack ? JSON.parse(selectedProject.techStack) : []
  const tags = selectedProject.tags ? JSON.parse(selectedProject.tags) : []

  return (
    <div className="flex flex-col h-full">
      {/* Project Header */}
      <div className="p-6 border-b">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{selectedProject.name}</h1>
            <p className="text-muted-foreground">{selectedProject.briefDescription}</p>
          </div>
          <div className="flex gap-2">
            {selectedProject.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </a>
              </Button>
            )}
            {selectedProject.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{selectedProject.type.replace('_', ' ')}</Badge>
          <Badge className={getStatusColor(selectedProject.status)}>
            {selectedProject.status.replace('_', ' ')}
          </Badge>
          <Badge className={getPriorityColor(selectedProject.priority)}>
            {selectedProject.priority}
          </Badge>
        </div>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-1">
              {techStack.map((tech: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Description */}
        {selectedProject.detailedDescription && (
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {selectedProject.detailedDescription}
            </p>
          </div>
        )}
      </div>

      {/* Project Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Items ({selectedProject.items.length})
            </h2>
            <Button 
              size="sm"
              onClick={() => setShowCreateItemDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {selectedProject.items.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No items yet. Add your first feature, bug, or task!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedProject.items.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                      <div className="flex gap-1">
                        <Badge className={`text-xs ${getTypeColor(item.type)}`}>
                          {item.type}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                        {item.status.replace('_', ' ')}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateItemDialog 
        open={showCreateItemDialog} 
        onOpenChange={setShowCreateItemDialog}
        projectId={selectedProject.id}
      />
    </div>
  )
}
