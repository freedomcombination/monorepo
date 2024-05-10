import { FC, useState } from 'react'

import { Button, HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { HiOutlineCheck, HiOutlineX, HiPencil } from 'react-icons/hi'

import { useArtFeedbackMutation } from '@fc/services'

import { ArtFeedbackFormTypes } from './types'
import {
  ActionButton,
  ActionStack,
  WAvatar,
  WConfirm,
  WConfirmProps,
} from '../../components'

export const ArtFeedbackForm: FC<ArtFeedbackFormTypes> = ({
  art,
  editor,
  onSuccess,
  onClose,
  setIsEditing,
}) => {
  const [feedback, setFeedback] = useState('')

  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const feedbackMutation = useArtFeedbackMutation()

  const { t } = useTranslation()

  const handleSuccess = () => {
    onSuccess?.()
    setConfirmState(undefined)
    onClose?.()
  }

  const handleReject = async () => {
    setConfirmState({
      isWarning: true,
      title: 'Reject art',
      description: 'Are you sure you want to reject this art?',
      buttonText: t('reject'),
      onConfirm: async () => {
        feedbackMutation.mutate(
          {
            art: art.id,
            message: feedback,
            status: 'rejected',
            point: 10,
          },
          { onSuccess: handleSuccess },
        )
      },
    })
  }

  const handleApprove = () => {
    setConfirmState({
      title: 'Approve art',
      description: 'Are you sure you want to approve this art?',
      buttonText: 'Approve',
      onConfirm: async () => {
        feedbackMutation.mutate(
          {
            art: art.id,
            message: feedback,
            status: 'approved',
            point: 10,
          },
          { onSuccess: handleSuccess },
        )
      },
    })
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}

      <Stack w={'full'} spacing={2}>
        <Text color={'black'} fontWeight={700}>
          {t('give-feedback')}
        </Text>
        <HStack align="start" spacing={2}>
          <WAvatar
            size="sm"
            src={editor?.avatar}
            name={editor?.name || editor.email}
          />

          <Stack flex={1} spacing={2}>
            <Textarea
              isRequired
              onChange={e => setFeedback(e.target.value)}
              placeholder={'Type your comment here'}
            />

            <ActionStack canApprove="arts" direction={'row'} spacing={2}>
              <Button
                flex={1}
                flexShrink={0}
                isDisabled={!feedback || art.approvalStatus === 'rejected'}
                onClick={handleReject}
                colorScheme="red"
                leftIcon={<HiOutlineX />}
              >
                {t('reject')}
              </Button>

              <Button
                flex={1}
                flexShrink={0}
                isDisabled={!feedback || art.approvalStatus === 'approved'}
                onClick={handleApprove}
                colorScheme="primary"
                leftIcon={<HiOutlineCheck />}
              >
                {t('approve')}
              </Button>

              <ActionButton
                canUpdate="arts"
                aria-label="Edit"
                flexShrink={0}
                onClick={onEdit}
                colorScheme="primary"
                leftIcon={<HiPencil />}
              >
                {t('edit')}
              </ActionButton>

              <Button
                aria-label="Close"
                flexShrink={0}
                onClick={onClose}
                colorScheme="gray"
              >
                {t('dismiss')}
              </Button>
            </ActionStack>
          </Stack>
        </HStack>
      </Stack>
    </>
  )
}
