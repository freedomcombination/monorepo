import { Block } from '@fc/types'

export const renderToHtml = (blocks: Block[]) => {
  if (!blocks) return ''

  return Object.values(blocks)
    .filter(block => block !== null && block !== undefined)
    .map(block => {
      switch (block?.type) {
        case 'paragraph':
          return `<p>${block?.children
            ?.filter(child => child?.text !== null && child?.text !== undefined)
            .map(child => child.text)
            .join('')}</p>`
        case 'heading':
          return `<h${block?.level}>${block?.children
            ?.filter(child => child?.text !== null && child?.text !== undefined)
            .map(child => child.text)
            .join('')}</h${block?.level}>`
        case 'list':
          return block?.format === 'ordered'
            ? `<ol>${block?.children
                ?.filter(
                  item => item?.text !== null && item?.text !== undefined,
                )
                .map(item => `<li>${item.text}</li>`)
                .join('')}</ol>`
            : `<ul>${block?.children
                ?.filter(
                  item => item?.text !== null && item?.text !== undefined,
                )
                .map(item => `<li>${item.text}</li>`)
                .join('')}</ul>`
        case 'link':
          return `<a href="${block?.url}">${block?.children
            ?.filter(child => child?.text !== null && child?.text !== undefined)
            .map(child => child.text)
            .join('')}</a>`
        default:
          return ''
      }
    })
    .join('')
}
