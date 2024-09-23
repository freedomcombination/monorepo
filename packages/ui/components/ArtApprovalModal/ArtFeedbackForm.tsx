import { FC, useState } from 'react'

import { HStack, Stack, Text, Textarea } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { HiOutlineCheck, HiOutlineX, HiPencil } from 'react-icons/hi'

import { Button } from '@fc/chakra'
import { useArtFeedbackMutation } from '@fc/services/art/feedback'

import { ArtFeedbackFormTypes } from './types'
import { ActionButton } from '../ActionButton'
import { ActionStack } from '../ActionStack'
import { WAvatar } from '../WAvatar'
import { WConfirm, WConfirmProps } from '../WConfirm'

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

      <Stack w={'full'} gap={2}>
        <Text color={'black'} fontWeight={700}>
          {t('give-feedback')}
        </Text>
        <HStack align="start" gap={2}>
          <WAvatar
            size="sm"
            src={editor?.avatar}
            name={editor?.name || editor.email}
          />

          <Stack flex={1} gap={2}>
            <Textarea
              required
              data-testid="input-feedback"
              onChange={e => setFeedback(e.target.value)}
              placeholder={'Type your comment here'}
            />

            <ActionStack canApprove="arts" direction={'row'} gap={2}>
              <Button
                data-testid="button-reject"
                flex={1}
                flexShrink={0}
                disabled={!feedback || art.approvalStatus === 'rejected'}
                onClick={handleReject}
                colorPalette="red"
                leftIcon={<HiOutlineX />}
              >
                {t('reject')}
              </Button>

              <Button
                data-testid="button-approve"
                flex={1}
                flexShrink={0}
                disabled={!feedback || art.approvalStatus === 'approved'}
                onClick={handleApprove}
                colorPalette="primary"
                leftIcon={<HiOutlineCheck />}
              >
                {t('approve')}
              </Button>

              <ActionButton
                data-testid="button-edit"
                canUpdate="arts"
                aria-label="Edit"
                flexShrink={0}
                onClick={onEdit}
                colorPalette="primary"
                leftIcon={<HiPencil />}
              >
                {t('edit')}
              </ActionButton>

              <Button
                data-testid="button-dismiss"
                aria-label="Close"
                flexShrink={0}
                onClick={onClose}
                colorPalette="gray"
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
