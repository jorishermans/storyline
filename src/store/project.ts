import { PageItem } from '@/models/pageitem.model'
import { ss } from '@storagestack/core'
import { defineStore } from 'pinia'

interface ProjectState {
  projectName: string
  cursor: string
  pageItem?: PageItem
}

export const useProjectStore = defineStore({
  id: 'project',
  state: (): ProjectState => ({
    projectName: '',
    cursor: 'index.json'
  }),
  getters: {
    getProjectName(state) {
      return state.projectName
    },
    getCursor(state) {
      return state.cursor
    }
  },
  actions: {
    async fetch() {
      const latest = await ss.get(
        `private/stories/${this.getProjectName}/latest.json`
      )
      if (latest.content) {
        this.cursor = latest.content
      }
      const pageItem = await ss.get(
        `private/stories/${this.getProjectName}/${this.getCursor}`
      )
      if (!pageItem.content) {
        this.pageItem = {
          filename: this.cursor,
          content: 'Your first lines in this story',
          children: []
        }
      } else {
        this.pageItem = pageItem.content
      }
    },
    async updatePageItemContent(content: string) {
      if (this.pageItem) {
        this.pageItem.content = content
        await ss.set(
          `private/stories/${this.getProjectName}/${this.getCursor}`,
          this.pageItem
        )
      }
    }
  }
})
