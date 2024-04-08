import { FC, useState } from 'react'

import { Box, HStack, IconButton, Textarea, Tooltip } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { FaPencilAlt, FaSave, FaTimes } from 'react-icons/fa'
import { FaInfo } from 'react-icons/fa6'
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'

import {
  useDeleteHashtagSentence,
  useHashtag,
  useUpdateHashtagSentence,
} from '@fc/services'

import { PostSentenceFormItemProps } from './types'
import { ArchivePopover } from '../../post-maker/GenAI/ArchivePopover'
import { WConfirm, WConfirmProps } from '../WConfirm'

export const PostSentenceFormItem: FC<PostSentenceFormItemProps> = ({
  id,
  index,
  sentence: defaultSentence,
  shareCount,
  isPublished,
  archiveId,
}) => {
  const [value, setValue] = useState(defaultSentence)
  const [editMode, setEditMode] = useState(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()
  const hashtag = useHashtag()

  const queryClient = useQueryClient()

  const onUpdateMutation = useUpdateHashtagSentence()

  const onDeleteMutation = useDeleteHashtagSentence()

  const isChanged = value !== defaultSentence

  const onSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['kv-hashtag-sentences', hashtag.id],
    })
    setEditMode(false)
  }

  const handleUpdate = () => {
    onUpdateMutation.mutate(
      {
        hashtagId: hashtag.id,
        index,
        value: `${value}::${id}::${shareCount}::${isPublished ? 1 : 0}:::${archiveId}`,
      },
      { onSuccess },
    )
  }

  const handleResetShared = () => {
    onUpdateMutation.mutate(
      {
        hashtagId: hashtag.id,
        index,
        value: `${defaultSentence}::${id}::${0}::${isPublished ? 1 : 0}:::${archiveId}`,
      },
      { onSuccess },
    )
  }

  const handleDelete = () => {
    setConfirmState({
      title: 'Delete sentence',
      description: 'Are you sure you want to delete this sentence?',
      buttonText: 'Delete',
      isWarning: true,
      onConfirm: () => {
        onDeleteMutation.mutate(
          {
            hashtagId: hashtag.id,
            value: `${defaultSentence}::${id}::${shareCount}::${
              isPublished ? 1 : 0
            }:::${archiveId}`,
          },
          { onSuccess },
        )
        setConfirmState(undefined)
      },
    })
  }

  const handlePublish = (approve: 0 | 1) =>
    onUpdateMutation.mutate(
      {
        hashtagId: hashtag.id,
        index,
        value: `${value}::${id}::${shareCount}::${approve}:::${archiveId}`,
      },
      { onSuccess },
    )

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <HStack>
        <Textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          flex={1}
          isDisabled={!editMode}
        />

        <ArchivePopover archiveId={archiveId}>
          <IconButton
            aria-label="archiveId info"
            colorScheme="red"
            size={'sm'}
            icon={<FaInfo />}
            rounded={'full'}
          />
        </ArchivePopover>

        {editMode && (
          <Tooltip label="Save" placement="top">
            <IconButton
              aria-label={'approve'}
              colorScheme={'green'}
              icon={<FaSave />}
              isDisabled={!isChanged}
              isRound
              onClick={handleUpdate}
              size={'sm'}
            />
          </Tooltip>
        )}

        {!editMode && (
          <Tooltip label="Edit" placement="top">
            <IconButton
              aria-label={'edit'}
              colorScheme={'gray'}
              icon={<FaPencilAlt />}
              isRound
              onClick={() => setEditMode(true)}
              size={'sm'}
            />
          </Tooltip>
        )}

        <Tooltip label="Reset shared" placement="top">
          <IconButton
            aria-label={'reset shared'}
            colorScheme={'gray'}
            icon={<Box>{shareCount}</Box>}
            isRound
            onClick={handleResetShared}
            size={'sm'}
            isDisabled={shareCount === 0}
          />
        </Tooltip>

        <Tooltip label={isPublished ? 'Unpublish' : 'Publish'} placement="top">
          <IconButton
            aria-label={'default'}
            colorScheme={isPublished ? 'yellow' : 'purple'}
            icon={
              isPublished ? (
                <MdOutlineUnpublished />
              ) : (
                <MdOutlinePublishedWithChanges />
              )
            }
            isRound
            onClick={() => handlePublish(isPublished ? 0 : 1)}
            size={'sm'}
          />
        </Tooltip>

        <Tooltip label="Delete" placement="top">
          <IconButton
            aria-label={'delete'}
            colorScheme={'red'}
            icon={<FaTimes />}
            isRound
            onClick={handleDelete}
            size={'sm'}
          />
        </Tooltip>
      </HStack>
    </>
  )
}
