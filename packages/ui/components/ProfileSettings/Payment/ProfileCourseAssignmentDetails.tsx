import { FC, useState } from 'react'

import { Button, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { API_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import { useUpdateModelMutation } from '@fc/services/common/updateModel'
import { UploadFile } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'
import { formatDate } from '@fc/utils/formatDate'

import { CourseAssignmentFileButton } from '../../CourseApplicationInstallment'
import { FilePicker } from '../../FilePicker'
import { KeyValue } from '../../KeyValueView'

export const ProfileCourseAssignmentDetails: FC<{
  courseLogic: CourseLogic
  onSave: () => void
}> = ({ courseLogic, onSave }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  if (courseLogic.haveSubmittedAssignmentFiles()) {
    return (
      <KeyValue tKey="course.assignment.details.kv.files-submitted-key">
        <VStack gap={2} alignItems={'flex-start'}>
          <Text>
            {t('course.assignment.details.kv.files-submitted-message')}
          </Text>
          <Text ml={2} fontWeight={'bold'}>
            {formatDate(
              courseLogic.getEvaluationDate(),
              'dd MMMM yyyy - HH:mm',
              locale,
            )}
          </Text>
        </VStack>
      </KeyValue>
    )
  }

  return (
    <KeyValue tKey="course.assignment.details.kv.course-assignment">
      <Stack>
        <KeyValue tKey="course.assignment.details.kv.assignment-files">
          <Stack wrap={'wrap'} gap={2}>
            {courseLogic.course.assignmentFiles?.map(file => (
              <CourseAssignmentFileButton key={file.id} file={file} />
            ))}
          </Stack>
        </KeyValue>
        <SubmitFilesForm courseLogic={courseLogic} onSave={onSave} />
      </Stack>
    </KeyValue>
  )
}

const SubmitFilesForm: FC<{
  courseLogic: CourseLogic
  onSave: () => void
}> = ({ courseLogic, onSave }) => {
  const { t } = useTranslation()
  const { token } = useAuthContext()
  const [files, setFiles] = useState<File[] | null>(null)
  const updateModelMutation = useUpdateModelMutation('course-applications')
  const application = courseLogic.myApplication!

  const uploadFiles = async (files: File[]): Promise<UploadFile[]> => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file, file.name)
    })
    const result = await fetch(API_URL + '/api/upload', {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return (await result.json()) as UploadFile[]
  }

  const onSaveFiles = async () => {
    const uploadedFiles = await uploadFiles(files!)
    updateModelMutation.mutate(
      {
        id: application.id,
        submittedAssignmentFiles: uploadedFiles.map(file => file.id),
      },
      {
        onSuccess: () => {
          onSave()
        },
      },
    )
  }

  return (
    <KeyValue tKey="course.assignment.details.kv.submit-files" divider={false}>
      <Stack width={450}>
        <FilePicker
          allowedFileTypes={['*/*']}
          onFilesChanged={(files: File[]) => setFiles(files)}
        />
        <Button
          colorScheme="primary"
          size="md"
          disabled={!files || files.length === 0}
          onClick={onSaveFiles}
          variant={'outline'}
        >
          {t('save')}
        </Button>
      </Stack>
    </KeyValue>
  )
}
