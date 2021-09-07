import { PageItem, PageLink } from '@/models/pageitem.model'
import { slugify } from '@/utilities/slugify'
import { ss } from '@storagestack/core'
import { defineStore } from 'pinia'
import { isGeneratorObject } from 'util/types'

interface PageTreeItem extends PageLink {
  children: PageTreeItem[]
}

interface ProjectState {
  projectName: string
  cursor: string
  pageItem?: PageItem
  tree: PageTreeItem
}

const treeSearch = (
  current: PageTreeItem,
  searchFileName: string
): PageTreeItem | null => {
  if (current.filename === searchFileName) {
    return current
  }
  let searchResult = null
  for (const child of current.children) {
    searchResult = treeSearch(child, searchFileName)
  }
  return searchResult
}

export const useProjectStore = defineStore({
  id: 'project',
  state: (): ProjectState => ({
    projectName: '',
    cursor: 'index.json',
    tree: { filename: 'index.json', name: 'root', children: [] }
  }),
  getters: {
    getProjectName(state) {
      return state.projectName
    },
    getCursor(state) {
      return state.cursor
    },
    getCurrentPageItemTree(state) {
      const parent = state.tree
      return treeSearch(parent, state.cursor)
    },
    children(state) {
      const pageItem = state.pageItem
      console.log('going after the children', state.pageItem)
      return pageItem ? pageItem.children : []
    }
  },
  actions: {
    async goTo(fileName: string) {
      if (fileName) {
        this.cursor = fileName
        await ss.set(
          `private/stories/${this.getProjectName}/latest.json`,
          fileName
        )
      }
    },
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
    },
    async addPageLink(name: string) {
      if (this.pageItem) {
        const slug = slugify(name)
        this.pageItem.children = this.pageItem.children ?? []
        this.pageItem.children.push({ filename: slug, name })
        await ss.set(
          `private/stories/${this.getProjectName}/${this.getCursor}`,
          this.pageItem
        )
        if (this.getCurrentPageItemTree) {
          this.getCurrentPageItemTree.children.push({
            filename: slug,
            name,
            children: []
          })
          await ss.set(
            `private/stories/${this.getProjectName}/tree.json`,
            this.pageItem
          )
        }
      }
    }
  }
})
