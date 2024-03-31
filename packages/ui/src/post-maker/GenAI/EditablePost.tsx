import { Stack, ThemeTypings } from '@chakra-ui/react'

import { EditableLine } from './EditableLine'
import { ArchivePost, useGenPostContext } from './GenPostProvider'

export type EditablePostProps = {
  postObject: ArchivePost
  archiveId: number
  descriptionThreshold?: number
  sentenceThreshold?: number
  onlySentences?: boolean
  colorScheme?: ThemeTypings['colorSchemes']
}

export const EditablePost: React.FC<EditablePostProps> = ({
  postObject,
  archiveId,
  descriptionThreshold = 250,
  sentenceThreshold = 200,
  onlySentences = false,
  colorScheme = 'primary',
}) => {
  const {
    removePost,
    modifyPost,
    removeSentence: removeSentences,
  } = useGenPostContext()

  const handleChangeSentence = (index: number, value: string) =>
    modifyPost(archiveId, {
      ...postObject,
      sentences: postObject.sentences.map((sentence, i) =>
        i === index ? value : sentence,
      ),
    })

  const handleChangeDescription = (value: string) =>
    modifyPost(archiveId, {
      ...postObject,
      description: value,
    })

  if (!postObject?.sentences?.length && !postObject?.description) {
    return null
  }

  return (
    <Stack
      background={'blackAlpha.100'}
      borderWidth={1}
      borderColor={'blackAlpha.300'}
      rounded={'md'}
      p={2}
    >
      {!onlySentences && (
        <EditableLine
          isDescription={true}
          isDisabled={archiveId < 0}
          defaultValue={postObject?.description}
          onDelete={() => removePost(archiveId, postObject.id)}
          onUpdate={handleChangeDescription}
          value={postObject.description}
          threshold={descriptionThreshold}
          thresholdStyles={{
            color: 'red.400',
          }}
          fontWeight={500}
          rounded={'md'}
          colorScheme={colorScheme}
        />
      )}
      {postObject?.sentences?.map((sentence, index) => {
        return (
          <EditableLine
            imageParams={postObject?.postInput?.imageParams ?? {}}
            key={`${postObject.id}-sent-${sentence}-${index}`}
            isDisabled={archiveId < 0}
            onDelete={() => {
              removeSentences(archiveId, postObject, sentence)
            }}
            onUpdate={val => handleChangeSentence(index, val)}
            value={sentence}
            threshold={sentenceThreshold}
            rounded={'md'}
            thresholdStyles={{
              color: 'red.400',
            }}
            colorScheme={colorScheme}
          />
        )
      })}
    </Stack>
  )
}
