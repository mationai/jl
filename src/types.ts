export interface Item {
  title: string,
  img?: string,
  imgHt?: number,
  path: string,
  date: string,
  text?: string,
} 
export interface List {
  label: string,
  items: Item[],
}