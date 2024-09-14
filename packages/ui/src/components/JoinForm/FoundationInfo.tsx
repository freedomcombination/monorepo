import { FC, useEffect, useState } from 'react'

import { Stack } from '@chakra-ui/react'
import { serialize } from 'next-mdx-remote/serialize'

import { Foundation } from '@fc/types'

import { Markdown } from '../Markdown'

export type FoundationInfoProps = {
  foundation: Foundation[]
}

export const FoundationInfo: FC<FoundationInfoProps> = ({ foundation }) => {
  const [serializedContent, setSerializedContent] = useState<any[]>([])

  useEffect(() => {
    const serializeMarkdown = async () => {
      const serializedData = await Promise.all(
        foundation.map(async item => {
          const serializedItem = await serialize(item.about || '')

          return serializedItem
        }),
      )
      setSerializedContent(serializedData)
    }

    serializeMarkdown()
  }, [foundation])

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
      {serializedContent.map((source, index) => (
        <Markdown key={index} source={source} />
      ))}
    </Stack>
  )
}
