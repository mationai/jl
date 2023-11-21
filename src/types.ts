export interface List {
  label: string,
  items: {
    title: string,
    img?: string,
    imgHt?: number,
    path: string,
    text?: string,
  }[]
} 