import { FC, useRef, useState } from 'react'

import { Badge, HStack, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
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
import type { ApprovalStatus } from '@fc/types'
import { formatDate, formatDateRelative } from '@fc/utils/formatDate'

import { CourseApplicationComponentProps } from './CourseApplicationDetails'
import { CourseAssignmentFileButton } from './CourseAssignmentFile'
import { KeyValue } from '../KeyValueView'

export const CourseAssignmentDetails: FC<CourseApplicationComponentProps> = ({
  courseLogic,
  onSave = () => {},
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const cancelRef = useRef(null)
  const [isActionReject, setIsActionReject] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState(false)
  const updateModelMutation = useUpdateModelMutation('course-applications')

  if (!courseLogic.course.requireApproval) return null
  const application = courseLogic.myApplication!
  const filesSent = courseLogic.haveSubmittedAssignmentFiles()

  const onAction = () => {
    updateModelMutation.mutate(
      {
        id: application.id,
        approvalStatus: (isActionReject
          ? 'rejected'
          : 'approved') satisfies ApprovalStatus,
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

  return (
    <Stack columnGap={2} borderWidth={1} borderRadius={'lg'} p={4}>
      <KeyValue tKey="course.applicant.details.assignment-files">
        {filesSent ? (
          <Stack wrap={'wrap'} columnGap={2}>
            {application?.submittedAssignmentFiles?.map(file => (
              <CourseAssignmentFileButton key={file.name} file={file} />
            ))}
          </Stack>
        ) : (
          <Text>{t('course.applicant.details.assignment-files.not-yet')}</Text>
        )}
      </KeyValue>

      {application.approvalStatus === 'pending' ? (
        <>
          <KeyValue
            when={filesSent}
            tKey="course.applicant.details.assignment-files.date"
          >
            <Text fontWeight={'bold'}>
              {formatDate(
                courseLogic.getFilesSubmittedDate()!,
                'dd MMMM yyyy - HH:mm',
                locale,
              )}{' '}
              (
              {formatDateRelative(courseLogic.getFilesSubmittedDate()!, locale)}
              )
            </Text>
          </KeyValue>

          <KeyValue
            when={filesSent}
            tKey="course.applicant.details.assignment-files.evaluate"
          >
            <Text fontWeight={'bold'}>
              {formatDate(
                courseLogic.getEvaluationDate(),
                'dd MMMM yyyy - HH:mm',
                locale,
              )}{' '}
              ({formatDateRelative(courseLogic.getEvaluationDate(), locale)})
            </Text>
          </KeyValue>

          <KeyValue
            when={!filesSent}
            tKey="course.applicant.details.assignment-files.due-date"
          >
            <Text fontWeight={'bold'}>
              {formatDate(
                courseLogic.getDeadlineDate(),
                'dd MMMM yyyy - HH:mm',
                locale,
              )}
            </Text>
          </KeyValue>

          <KeyValue
            when={filesSent}
            tKey="course.applicant.details.assignment-files.action"
          >
            <HStack columnGap={2}>
              <Button
                colorScheme="green"
                onClick={() => {
                  setIsActionReject(false)
                  setIsOpen(true)
                }}
              >
                {t('approve')}
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  setIsActionReject(true)
                  setIsOpen(true)
                }}
              >
                {t('reject')}
              </Button>
            </HStack>
          </KeyValue>
        </>
      ) : (
        <KeyValue tKey="approvalStatus">
          <Badge colorScheme="green" variant="outline">
            {application.approvalStatus}
          </Badge>
        </KeyValue>
      )}

      <Dialog open={isOpen} onOpenChange={e => !e.open && setIsOpen(false)}>
        <DialogOverlay>
          <DialogContent>
            <DialogHeader fontSize="lg" fontWeight="bold">
              {t(isActionReject ? 'reject' : 'approve')}
            </DialogHeader>

            <DialogBody>
              {t('course.applicant.details.explain.warn')}
            </DialogBody>

            <DialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                {t('cancel')}
              </Button>
              <Button colorScheme="red" onClick={onAction} ml={3}>
                {t(isActionReject ? 'reject' : 'approve')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </Stack>
  )
}
