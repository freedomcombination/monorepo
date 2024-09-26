import { FC } from 'react'

import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  chakra,
} from '@chakra-ui/react'
import {
  BlocksContent,
  BlocksRenderer as StrapiBlocksRenderer,
} from '@strapi/blocks-react-renderer'
import Link from 'next/link'

type BlocksRendererProps = {
  content: BlocksContent | null
}

export const BlocksRenderer: FC<BlocksRendererProps> = ({ content }) => {
  if (!content) return null

  return (
    <StrapiBlocksRenderer
      content={content}
      blocks={{
        // You can use the default components to set class names...
        paragraph: ({ children }) => (
          <Text mb={2} _last={{ mb: 0 }}>
            {children}
          </Text>
        ),
        // ...or point to a design system
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return (
                <Heading size={'xl'} as="h1">
                  {children}
                </Heading>
              )
            case 2:
              return (
                <Heading size={'lg'} as="h2">
                  {children}
                </Heading>
              )
            case 3:
              return (
                <Heading size={'md'} as="h3">
                  {children}
                </Heading>
              )
            case 4:
              return (
                <Heading size={'md'} as="h4">
                  {children}
                </Heading>
              )
            case 5:
              return (
                <Heading size={'md'} as="h5">
                  {children}
                </Heading>
              )
            case 6:
              return (
                <Heading size={'md'} as="h6">
                  {children}
                </Heading>
              )
            default:
              return (
                <Heading size={'md'} as="h1">
                  {children}
                </Heading>
              )
          }
        },
        // For links, you may want to use the component from your router or framework
        link: ({ children, url }) => {
          const isExternal = url.startsWith('http')

          return (
            <Link
              href={url}
              {...(isExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {children}
            </Link>
          )
        },
        list: ({ children, format }) =>
          format === 'ordered' ? (
            <OrderedList>{children}</OrderedList>
          ) : (
            <UnorderedList>{children}</UnorderedList>
          ),
        'list-item': ({ children }) => <ListItem>{children}</ListItem>,
      }}
      modifiers={{
        bold: ({ children }) => (
          <chakra.span fontWeight={700}>{children}</chakra.span>
        ),
        italic: ({ children }) => (
          <chakra.span fontStyle={'italic'}>{children}</chakra.span>
        ),
      }}
    />
  )
}
