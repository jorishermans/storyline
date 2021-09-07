export interface PageLink {
  filename: string
  name: string
}

export interface PageItem {
  filename: string
  parentNode?: string
  content: string
  children: PageLink[]
}
