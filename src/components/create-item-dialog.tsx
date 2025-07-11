'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { ProjectItemType, ItemStatus, Priority } from '@/types'
import { useProjectStore } from '@/store/projects'

interface CreateItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectId: string
}

export function CreateItemDialog({ open, onOpenChange, projectId }: CreateItemDialogProps) {
  const { addProjectItem } = useProjectStore()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'FEATURE' as ProjectItemType,
    status: 'TODO' as ItemStatus,
    priority: 'MEDIUM' as Priority,
    labels: [] as string[]
  })
  const [labelsInput, setLabelsInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Parse labels from comma-separated string
      const labels = labelsInput.split(',').map(s => s.trim()).filter(Boolean)

      const itemData = {
        projectId,
        ...formData,
        labels
      }

      // Submit to API
      const response = await fetch('/api/project-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create item')
      }

      const newItem = await response.json()

      // Update store
      addProjectItem(projectId, newItem)

      // Reset form and close dialog
      setFormData({
        name: '',
        description: '',
        type: 'FEATURE',
        status: 'TODO',
        priority: 'MEDIUM',
        labels: []
      })
      setLabelsInput('')
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to create item:', error)
      if (error instanceof Error) {
        setErrors({ general: error.message })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
              {errors.general}
            </div>
          )}

          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Add dark mode toggle"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Implement a dark mode toggle in the header..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as ProjectItemType })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FEATURE">Feature</SelectItem>
                  <SelectItem value="BUG">Bug</SelectItem>
                  <SelectItem value="IMPROVEMENT">Improvement</SelectItem>
                  <SelectItem value="TASK">Task</SelectItem>
                  <SelectItem value="RESEARCH">Research</SelectItem>
                  <SelectItem value="DOCUMENTATION">Documentation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as ItemStatus })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="BLOCKED">Blocked</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
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
            <Label htmlFor="labels">Labels</Label>
            <Input
              id="labels"
              value={labelsInput}
              onChange={(e) => setLabelsInput(e.target.value)}
              placeholder="ui, frontend, enhancement"
            />
            <p className="text-xs text-muted-foreground mt-1">Separate labels with commas</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Item'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
