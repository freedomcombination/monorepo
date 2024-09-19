import { FC } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { Course, CourseApplication } from '@fc/types'

import { CourseAssignmentDetails } from './components/CourseAssignmentDetails'
import { CourseInstallmentDetails } from './components/CourseInstallmentDetails'
import { CoursePaymentDetails } from './components/CoursePaymentDetails'
import { CoursePaymentExplainDetails } from './components/CoursePaymentExplainDetails'

export type CourseApplicationDetailsProps = {
  course: Course
  application: CourseApplication
  onSave?: () => void
}

export const CourseApplicationDetails: FC<CourseApplicationDetailsProps> = ({
  course,
  application,
  onSave,
}) => {
  const { t } = useTranslation()

  const items = [
    {
      visible: !!application.paymentExplanation,
      title: t('course.applicant.details.explain.header'),
      node: (
        <CoursePaymentExplainDetails
          course={course}
          application={application}
          onSave={onSave}
        />
      ),
    },
    {
      visible: course.requireApproval,
      title: t('course.applicant.details.assignment.header'),
      node: (
        <CourseAssignmentDetails
          course={course}
          application={application}
          onSave={onSave}
        />
      ),
    },
    {
      visible: !!course.price,
      title: t('course.applicant.details.installment.header'),
      node: (
        <CourseInstallmentDetails
          course={course}
          application={application}
          onSave={onSave}
        />
      ),
    },
    {
      visible: !!course.price,
      title: t('course.applicant.details.payments.header'),
      node: (
        <CoursePaymentDetails
          course={course}
          application={application}
          onSave={onSave}
        />
      ),
    },
  ]

  return (
    <>
      {application.approvalStatus !== 'rejected' ? (
        <Accordion p={0} allowMultiple borderWidth={1} m={4}>
          {items.map(
            ({ visible, title, node }) =>
              visible && (
                <AccordionItem key={title}>
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="lg"
                      >
                        {title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>{node}</AccordionPanel>
                </AccordionItem>
              ),
          )}
        </Accordion>
      ) : (
        <Center p={10}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderWidth={1}
            borderRadius={'lg'}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {t('course.applicant.details.rejected')}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {t('course.applicant.details.rejected.message')}
            </AlertDescription>
          </Alert>
        </Center>
      )}
    </>
  )
}
