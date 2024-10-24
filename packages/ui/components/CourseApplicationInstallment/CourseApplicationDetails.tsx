import { FC } from 'react'

import { Box, Center } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
} from '@fc/chakra'
import { Course, CourseApplication } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'

import { CourseAssignmentDetails } from './CourseAssignmentDetails'
import { CourseInstallmentDetails } from './CourseInstallmentDetails'
import { CoursePaymentDetails } from './CoursePaymentDetails'
import { CoursePaymentExplainDetails } from './CoursePaymentExplainDetails'

type CourseApplicationDetailsProps = {
  course: Course
  application: CourseApplication
  onSave: () => void
}

export type CourseApplicationComponentProps = {
  courseLogic: CourseLogic
  onSave: () => void
}

export const CourseApplicationDetails: FC<CourseApplicationDetailsProps> = ({
  course,
  application,
  onSave,
}) => {
  const { t } = useTranslation()
  const courseLogic = new CourseLogic(
    course,
    [application],
    application.profile!,
  )

  const items = [
    {
      visible: !!application.paymentExplanation,
      title: t('course.applicant.details.explain.header'),
      node: (
        <CoursePaymentExplainDetails
          courseLogic={courseLogic}
          onSave={onSave}
        />
      ),
    },
    {
      visible: course.requireApproval,
      title: t('course.applicant.details.assignment.header'),
      node: (
        <CourseAssignmentDetails courseLogic={courseLogic} onSave={onSave} />
      ),
    },
    {
      visible: !!course.price,
      title: t('course.applicant.details.installment.header'),
      node: (
        <CourseInstallmentDetails courseLogic={courseLogic} onSave={onSave} />
      ),
    },
    {
      visible: !!course.price,
      title: t('course.applicant.details.payments.header'),
      node: <CoursePaymentDetails courseLogic={courseLogic} onSave={onSave} />,
    },
  ]

  return (
    <>
      {application.approvalStatus !== 'rejected' ? (
        <Accordion p={0} multiple borderWidth={1} m={4}>
          {items.map(
            ({ visible, title, node }) =>
              visible && (
                <AccordionItem key={title} value={title}>
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
            title={t('course.applicant.details.rejected')}
          >
            {t('course.applicant.details.rejected.message')}
          </Alert>
        </Center>
      )}
    </>
  )
}
