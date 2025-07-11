import { create } from 'zustand'
import { ProjectWithItems, ProjectItem } from '@/types'

interface ProjectStore {
  projects: ProjectWithItems[]
  selectedProject: ProjectWithItems | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setProjects: (projects: ProjectWithItems[]) => void
  setSelectedProject: (project: ProjectWithItems | null) => void
  addProject: (project: ProjectWithItems) => void
  updateProject: (project: ProjectWithItems) => void
  deleteProject: (id: string) => void
  addProjectItem: (projectId: string, item: ProjectItem) => void
  updateProjectItem: (projectId: string, item: ProjectItem) => void
  deleteProjectItem: (projectId: string, itemId: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,

  setProjects: (projects) => set({ projects }),
  
  setSelectedProject: (project) => set({ selectedProject: project }),
  
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project]
  })),
  
  updateProject: (updatedProject) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === updatedProject.id ? updatedProject : p
    ),
    selectedProject: state.selectedProject?.id === updatedProject.id 
      ? updatedProject 
      : state.selectedProject
  })),
  
  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter(p => p.id !== id),
    selectedProject: state.selectedProject?.id === id ? null : state.selectedProject
  })),
  
  addProjectItem: (projectId, item) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === projectId 
        ? { ...p, items: [...p.items, item] }
        : p
    ),
    selectedProject: state.selectedProject?.id === projectId
      ? { ...state.selectedProject, items: [...state.selectedProject.items, item] }
      : state.selectedProject
  })),
  
  updateProjectItem: (projectId, updatedItem) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === projectId 
        ? { ...p, items: p.items.map(i => i.id === updatedItem.id ? updatedItem : i) }
        : p
    ),
    selectedProject: state.selectedProject?.id === projectId
      ? { ...state.selectedProject, items: state.selectedProject.items.map(i => i.id === updatedItem.id ? updatedItem : i) }
      : state.selectedProject
  })),
  
  deleteProjectItem: (projectId, itemId) => set((state) => ({
    projects: state.projects.map(p => 
      p.id === projectId 
        ? { ...p, items: p.items.filter(i => i.id !== itemId) }
        : p
    ),
    selectedProject: state.selectedProject?.id === projectId
      ? { ...state.selectedProject, items: state.selectedProject.items.filter(i => i.id !== itemId) }
      : state.selectedProject
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error })
}))
