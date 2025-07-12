'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { ProjectType, ProjectStatus, Priority } from '@/types'
import { createProjectSchema, CreateProjectInput } from '@/lib/validations'

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectCreated: () => void
}

export function CreateProjectDialog({ open, onOpenChange, onProjectCreated }: CreateProjectDialogProps) {
  const [formData, setFormData] = useState<Partial<CreateProjectInput>>({
    name: '',
    type: 'WEBAPP',
    status: 'PLANNING',
    priority: 'MEDIUM',
    briefDescription: '',
    detailedDescription: '',
    liveUrl: '',
    githubUrl: '',
    localPath: '',
    techStack: [],
    tags: []
  })
  const [techStackInput, setTechStackInput] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Parse tech stack and tags from comma-separated strings
      const techStack = techStackInput.split(',').map(s => s.trim()).filter(Boolean)
      const tags = tagsInput.split(',').map(s => s.trim()).filter(Boolean)

      const projectData = {
        ...formData,
        techStack,
        tags
      } as CreateProjectInput

      // Validate data
      const validatedData = createProjectSchema.parse(projectData)

      // Submit to API
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(validatedData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create project')
      }

      // Reset form and close dialog
      setFormData({
        name: '',
        type: 'WEBAPP',
        status: 'PLANNING',
        priority: 'MEDIUM',
        briefDescription: '',
        detailedDescription: '',
        liveUrl: '',
        githubUrl: '',
        localPath: '',
        techStack: [],
        tags: []
      })
      setTechStackInput('')
      setTagsInput('')
      onOpenChange(false)
      onProjectCreated()
    } catch (error) {
      console.error('Failed to create project:', error)
      if (error instanceof Error) {
        setErrors({ general: error.message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
              {errors.general}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Awesome Project"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as ProjectType })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WEBAPP">Web App</SelectItem>
                  <SelectItem value="WEBSITE">Website</SelectItem>
                  <SelectItem value="CLI">CLI Tool</SelectItem>
                  <SelectItem value="API">API</SelectItem>
                  <SelectItem value="MOBILE">Mobile App</SelectItem>
                  <SelectItem value="DESKTOP">Desktop App</SelectItem>
                  <SelectItem value="BROWSER_EXTENSION">Browser Extension</SelectItem>
                  <SelectItem value="AI_PROJECT">AI Project</SelectItem>
                  <SelectItem value="DEVOPS">DevOps</SelectItem>
                  <SelectItem value="CLONE">Clone</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as ProjectStatus })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PLANNING">Planning</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="ON_HOLD">On Hold</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value as Priority })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="briefDescription">Brief Description *</Label>
            <Textarea
              id="briefDescription"
              value={formData.briefDescription || ''}
              onChange={(e) => setFormData({ ...formData, briefDescription: e.target.value })}
              placeholder="A short description of what this project does..."
              required
            />
          </div>

          <div>
            <Label htmlFor="detailedDescription">Detailed Description</Label>
            <Textarea
              id="detailedDescription"
              value={formData.detailedDescription || ''}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              placeholder="More detailed information about the project..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                type="url"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="localPath">Local Path</Label>
            <Input
              id="localPath"
              value={formData.localPath || ''}
              onChange={(e) => setFormData({ ...formData, localPath: e.target.value })}
              placeholder="web-apps/my-project"
            />
          </div>

          <div>
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="React, TypeScript, Next.js, Tailwind CSS"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate technologies with commas</p>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="frontend, dashboard, admin"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
