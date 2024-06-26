import { useRouter } from 'next/router'
import { CourseFaqItemProps } from './types'
import { AccordionButton, AccordionPanel, Box } from '@chakra-ui/react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { FC } from 'react'

export const CourseFaqItem: FC<CourseFaqItemProps> = ({ item, isExpanded }) => {
  const { locale } = useRouter()

  const question = item[`question_${locale || 'nl'}`]
  const answer = item[`answer_${locale || 'nl'}`]

  return (
    <>
      <AccordionButton>
        <Box as="h4" fontSize={'lg'} flex="1" textAlign="left">
          {question}
        </Box>
        {isExpanded ? <FaMinus fontSize="12px" /> : <FaPlus fontSize="12px" />}
      </AccordionButton>
      <AccordionPanel pb={4}>{answer}</AccordionPanel>
    </>
  )
}
