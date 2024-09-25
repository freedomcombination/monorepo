import { FC } from 'react'

import { HStack, Stack, Text, Wrap } from '@chakra-ui/react'
import { isPast } from 'date-fns'
import { useRouter } from 'next/router'

import { CourseLogic } from '@fc/utils/courseLogic'
import { formatDate } from '@fc/utils/formatDate'

import { CourseAssignmentFileButton } from '../../../CourseApplicationInstallment'
import { KeyValue } from '../../../KeyValueView'

export const ProfileCourseAssignmentDetails: FC<{
  courseLogic: CourseLogic
}> = ({ courseLogic }) => {
  const { locale } = useRouter()

  if (
    !courseLogic.haveSubmittedAssignmentFiles() &&
    isPast(courseLogic.getDeadlineDate())
  ) {
  }

  return (
    <KeyValue title="Kurs Gereksinimleri">
      <Stack>
        <KeyValue title="Dosyalar">
          <Wrap spacing={2}>
            {courseLogic.course.assignmentFiles?.map(file => (
              <CourseAssignmentFileButton key={file.id} file={file} />
            ))}
          </Wrap>
        </KeyValue>

        {courseLogic.haveSubmittedAssignmentFiles() ? (
          <KeyValue title="Ödev dosyalarını gönderdiniz.">
            <HStack>
              <Text>
                Dosyalar elimize ulaştı. Aşağıda belirtilen tarihe kadar
                değerlendirip sonucu size bildireceğiz.
              </Text>
              <Text>
                {formatDate(
                  courseLogic.getEvaluationDate(),
                  'dd MMMM yyyy',
                  locale,
                )}
              </Text>
            </HStack>
          </KeyValue>
        ) : (
          <SubmitFilesForm courseLogic={courseLogic} />
        )}
      </Stack>
    </KeyValue>
  )
}

const SubmitFilesForm: FC<{
  courseLogic: CourseLogic
}> = () => {
  return null
}
