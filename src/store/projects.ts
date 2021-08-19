import { ss } from '@storagestack/core'
import { defineStore } from 'pinia'

interface ProjectsState {
  projects: string[]
}

export const useProjectsStore = defineStore({
  id: 'projects',
  state: (): ProjectsState => ({
    projects: []
  }),
  getters: {
    getProjects(state) {
      return state.projects
    }
  },
  actions: {
    async addProject(payload: string | null) {
      if (payload) {
        this.projects.push(payload)
        await ss.set('private/stories/projects.json', this.projects)
      }
    },
    async fetch() {
      const projects = await ss.get('private/stories/projects.json')
      this.projects = projects ? projects.content : []
    }
  }
})
