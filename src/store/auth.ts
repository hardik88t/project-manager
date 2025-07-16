import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  username: string
  email: string
  name?: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (usernameOrEmail: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      login: async (usernameOrEmail: string, password: string) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernameOrEmail, password }),
          })

          const data = await response.json()

          if (!response.ok) {
            set({ error: data.error || 'Login failed', isLoading: false })
            return false
          }

          set({
            user: data.user,
            token: data.token,
            isLoading: false,
            error: null
          })

          return true
        } catch (error) {
          set({
            error: 'Network error. Please try again.',
            isLoading: false
          })
          return false
        }
      },

      logout: async () => {
        set({ isLoading: true })
        
        try {
          await fetch('/api/auth/logout', {
            method: 'POST',
          })
        } catch (error) {
          console.error('Logout error:', error)
        }
        
        set({
          user: null,
          token: null,
          isLoading: false,
          error: null
        })
      },

      checkAuth: async () => {
        const { token } = get()
        
        if (!token) {
          return
        }

        set({ isLoading: true })
        
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            set({ user: data.user, isLoading: false })
          } else {
            // Token is invalid, clear auth
            set({ user: null, token: null, isLoading: false })
          }
        } catch (error) {
          console.error('Auth check error:', error)
          set({ user: null, token: null, isLoading: false })
        }
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          isLoading: false,
          error: null
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token
      })
    }
  )
)
