import { Block, TextBlock } from '@fc/types'

export const parseHtmlToBlocks = (htmlString: string): Block[] => {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    if (!doc || !doc.body) {
      return []
    }

    const blocks: Block[] = []

    Array.from(doc.body.childNodes).forEach(node => {
      if (!node) {
        return
      }

      if (node.nodeName === 'P') {
        blocks.push({
          type: 'paragraph',
          children: [{ text: node.textContent || '', type: 'text' }],
        })
      } else if (
        node.nodeName === 'H1' ||
        node.nodeName === 'H2' ||
        node.nodeName === 'H3'
      ) {
        const level = node.nodeName.replace('H', '')
        blocks.push({
          type: 'heading',
          level: parseInt(level, 10),
          children: [{ text: node.textContent || '', type: 'text' }],
        })
      } else if (node.nodeName === 'OL') {
        const listItems = Array.from(node.childNodes).map((liNode: any) => ({
          text: liNode.textContent || '',
          type: 'text' as const,
        }))
        blocks.push({
          type: 'list',
          format: 'ordered',
          children: listItems as TextBlock[],
        })
      } else if (node.nodeName === 'UL') {
        const listItems = Array.from(node.childNodes).map((liNode: any) => ({
          text: liNode.textContent || '',
          type: 'text' as const,
        }))
        blocks.push({
          type: 'list',
          format: 'unordered',
          children: listItems as TextBlock[],
        })
      } else if (node.nodeName === 'A') {
        const anchorNode = node as HTMLAnchorElement
        blocks.push({
          type: 'link',
          url: anchorNode.href,
          children: [{ text: anchorNode.textContent || '', type: 'text' }],
        })
      }
    })

    return blocks
  } catch (error) {
    console.error('Error parsing HTML to blocks:', error)

    return []
  }
}
