import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaPlus } from 'react-icons/fa6'

import { AccordionButton, AccordionPanel } from '@fc/chakra'

import { CourseFaqItemProps } from '../CourseDetailPage/types'

export const CourseFaqItem: FC<CourseFaqItemProps> = ({ item }) => {
  const { locale } = useRouter()

  const question = item[`question_${locale || 'nl'}`]
  const answer = item[`answer_${locale || 'nl'}`]

  return (
    <>
      <AccordionButton>
        <Box as="h4" fontSize={'lg'} flex="1" textAlign="left">
          {question}
        </Box>
        <FaPlus fontSize="12px" />
      </AccordionButton>
      <AccordionPanel pb={4}>{answer}</AccordionPanel>
    </>
  )
}
