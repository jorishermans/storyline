import { ss } from '@storagestack/core'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

// define your typings for the store state
export interface ProjectsStoreState {
  projects: string[]
}

// define injection key
export const projectsKey: InjectionKey<Store<ProjectsStoreState>> =
  Symbol('project')

export const projectsStore = createStore<ProjectsStoreState>({
  state: {
    projects: []
  },
  mutations: {
    // synchronous
  },
  actions: {
    // asynchronous
    async addProject(this, ctx, payload) {
      ctx.state.projects.push(payload)
      await ss.set('private/stories/projects.json', ctx.state.projects)
    },
    async fetch(this, ctx) {
      const projects = await ss.get('private/stories/projects.json')
      ctx.state.projects = projects ? projects.content : []
    }
  },
  modules: {},
  getters: {
    getProjects: (state) => state.projects
  }
})
