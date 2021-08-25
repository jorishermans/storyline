export interface PageItem {
  filename: string
  parentNode?: string
  content: string
  children: PageItem[]
}
