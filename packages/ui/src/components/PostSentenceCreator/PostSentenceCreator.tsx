import { useEffect, useState } from 'react'

import { HStack, IconButton, Textarea, ThemeTypings } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { FaPlus } from 'react-icons/fa'

import { useCreateHashtagSentence } from '@fc/services'
import { toastMessage } from '@fc/utils'

type PostSentenceCreatorProps = {
  hashtagId: number
  postId: number
  initialContent?: string
  colorScheme?: ThemeTypings['colorSchemes']
  onSuccess?: () => void
}

export const PostSentenceCreator = ({
  hashtagId,
  postId,
  initialContent,
  colorScheme,
  onSuccess,
}: PostSentenceCreatorProps) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(initialContent)
  const onAddMutation = useCreateHashtagSentence()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (initialContent !== value) {
      setValue(initialContent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent])

  const handleAdd = () => {
    const sentences: string[] =
      queryClient.getQueryData(['kv-hashtag-sentences', hashtagId]) || []
    const postIdFilteredSentences = sentences?.filter(
      s => s.split('::')[1] === String(postId),
    )

    let sentence = ''
    for (sentence of postIdFilteredSentences) {
      // Some generated sentences end with a punctuation, some don't
      if (
        value?.trim().replace(/[.!]$/, '') ===
        sentence.split('::')[0].trim().replace(/[.!]$/, '')
      ) {
        toastMessage('Error', t('addExistingHashtagPost'), 'error')

        return
      }
    }

    onAddMutation.mutate(
      { hashtagId, value: [`${value}::${postId}::${0}::${0}`] },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['kv-hashtag-sentences', hashtagId],
          })
          onSuccess?.()
          toastMessage('Success', t('post.add.success.description'), 'success')
        },
      },
    )
  }

  return (
    <HStack>
      <Textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add sentence"
        bgColor={'whiteAlpha.700'}
      />
      <IconButton
        aria-label="Add sentence"
        icon={<FaPlus />}
        onClick={handleAdd}
        {...(colorScheme && { colorScheme })}
      />
    </HStack>
  )
}
