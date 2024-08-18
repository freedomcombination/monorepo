import { FC } from 'react'

import { Accordion, AccordionItem } from '@fc/chakra'

import { CourseFaqsProps } from './types'
import { CourseFaqItem } from '../CourseDetailFaqItem'

export const CourseFaqs: FC<CourseFaqsProps> = ({ faqs }) => {
  return (
    <Accordion multiple>
      {faqs.map(item => (
        <AccordionItem value={`${item.id}`} key={item.id}>
          <CourseFaqItem item={item} />
        </AccordionItem>
      ))}
    </Accordion>
  )
}
