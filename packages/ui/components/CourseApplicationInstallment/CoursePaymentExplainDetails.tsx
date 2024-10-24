import { FC } from 'react'
import React from 'react'

import { Text, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  Button,
  toaster,
} from '@fc/chakra'
import { useUpdateModelMutation } from '@fc/services/common/updateModel'
import { ApprovalStatus } from '@fc/types'

import { CourseApplicationComponentProps } from './CourseApplicationDetails'
import { KeyValue } from '../KeyValueView'

export const CoursePaymentExplainDetails: FC<
  CourseApplicationComponentProps
> = ({ courseLogic, onSave = () => {} }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [dialogTitle, setDialogTitle] = React.useState('')
  const [actionText, setActionText] = React.useState('')
  const [action, setAction] = React.useState('')
  const { t } = useTranslation()
  const updateModelMutation = useUpdateModelMutation('course-applications')
  const cancelRef = React.useRef(null)
  const application = courseLogic.myApplication!

  const onReject = () => {
    setDialogTitle(t('course.applicant.details.explain.kv.reject'))
    setActionText(t('course.applicant.details.explain.action.reject'))
    setAction('onRefuse')
    setIsOpen(true)
  }

  const onDelete = () => {
    setDialogTitle(t('course.applicant.details.explain.kv.delete-explanation'))
    setActionText(t('course.applicant.details.explain.action.delete'))
    setAction('onDelete')
    setIsOpen(true)
  }

  const onRejectAction = () => {
    updateModelMutation.mutate(
      {
        id: application.id,
        approvalStatus: 'rejected' satisfies ApprovalStatus,
      },
      {
        onSuccess: () => {
          onSave()
        },
        onError: () => {
          toaster.create({
            title: t('update-failed'),
            description: t('course.applicant.details.explain.action.reject'),
            type: 'error',
          })
        },
      },
    )
    setIsOpen(false)
  }

  const onDeleteAction = () => {
    updateModelMutation.mutate(
      {
        id: application.id,
        paymentExplanation: null,
      },
      {
        onSuccess: () => {
          onSave()
        },
        onError: () => {
          toaster.create({
            title: t('update-failed'),
            description: t('course.applicant.details.explain.action.delete'),
            type: 'error',
          })
        },
      },
    )
    setIsOpen(false)
  }

  return (
    <Stack gap={2} borderWidth={1} borderRadius={'lg'} p={4}>
      <KeyValue tKey="course.applicant.details.explain.kv.explain">
        <Text fontSize={'lg'}>{application.paymentExplanation}</Text>
      </KeyValue>
      <KeyValue tKey="course.applicant.details.explain.kv.delete-explanation">
        <Button colorScheme="red" variant={'outline'} onClick={onDelete}>
          {t('course.applicant.details.explain.action.delete')}
        </Button>
      </KeyValue>
      <KeyValue tKey="course.applicant.details.explain.kv.reject">
        <Button colorScheme="red" variant={'outline'} onClick={onReject}>
          {t('course.applicant.details.explain.action.reject')}
        </Button>
      </KeyValue>

      <Dialog open={isOpen} onOpenChange={o => !o.open && setIsOpen(false)}>
        <DialogOverlay>
          <DialogContent>
            <DialogHeader fontSize="lg" fontWeight="bold">
              {dialogTitle}
            </DialogHeader>

            <DialogBody>
              {t('course.applicant.details.explain.warn')}
            </DialogBody>

            <DialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                {t('cancel')}
              </Button>
              <Button
                colorScheme="red"
                onClick={
                  action === 'onDelete' ? onDeleteAction : onRejectAction
                }
                ml={3}
              >
                {actionText}
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </Stack>
  )
}
