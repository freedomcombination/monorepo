import { FC } from 'react'

import { Accordion, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaMinus, FaPlus } from 'react-icons/fa6'

import { CourseFaqItemProps } from '../CourseDetailPage/types'

export const CourseFaqItem: FC<CourseFaqItemProps> = ({ item, isExpanded }) => {
  const { locale } = useRouter()

  const question = item[`question_${locale || 'nl'}`]
  const answer = item[`answer_${locale || 'nl'}`]

  return (
    <>
      <Accordion.ItemTrigger>
        <Box as="h4" fontSize={'lg'} flex="1" textAlign="left">
          {question}
        </Box>
        {isExpanded ? <FaMinus fontSize="12px" /> : <FaPlus fontSize="12px" />}
      </Accordion.ItemTrigger>
      <Accordion.ItemContent pb={4}>{answer}</Accordion.ItemContent>
    </>
  )
}
