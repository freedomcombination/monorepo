import { FC } from 'react'

import { Accordion, AccordionItem } from '@chakra-ui/react'

import { CourseFaqsProps } from './types'
import { CourseFaqItem } from '../CourseDetailFaqItem'

export const CourseFaqs: FC<CourseFaqsProps> = ({ faqs }) => {
  return (
    <Accordion allowMultiple>
      {faqs.map(item => (
        <AccordionItem key={item.id}>
          {({ isExpanded }) => (
            <CourseFaqItem item={item} isExpanded={isExpanded} />
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
