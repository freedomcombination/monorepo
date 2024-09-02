import { FC } from 'react'

import { Accordion, AccordionItem } from '@fc/chakra'

import { useCourseContext } from './CourseContext'
import { CourseFaqItem } from '../CourseDetailFaqItem'

export const CourseFaqs: FC = () => {
  const { course } = useCourseContext()
  const faqs = course.faqs || []

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
