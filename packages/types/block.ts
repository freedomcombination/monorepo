export type TextBlock = {
  type: 'text'
  text: string
}

export type ParagraphBlock = {
  type: 'paragraph'
  children: TextBlock[]
}

export type HeadingBlock = {
  type: 'heading'
  level: number
  children: TextBlock[]
}

export type ListBlock = {
  type: 'list'
  format: 'ordered' | 'unordered'
  children: TextBlock[]
}

export type LinkBlock = {
  type: 'link'
  url: string
  children: TextBlock[]
}

export type Block = ParagraphBlock | HeadingBlock | ListBlock | LinkBlock
