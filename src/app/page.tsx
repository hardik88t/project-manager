'use client'

import { ProjectList } from '@/components/project-list'
import { ProjectDetails } from '@/components/project-details'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Left Panel - Project List */}
      <div className="w-1/3 border-r bg-muted/10">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Project Manager</h1>
          <p className="text-sm text-muted-foreground">Manage and track your development projects</p>
        </div>
        <ProjectList />
      </div>

      <Separator orientation="vertical" />

      {/* Right Panel - Project Details */}
      <div className="flex-1">
        <ProjectDetails />
      </div>
    </div>
  );
}
