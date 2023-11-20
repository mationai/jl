export interface List {
  label: string,
  items: {
    title: string,
    img?: string,
    path: string,
    text?: string,
  }[]
} 