import { FC } from 'react'

import { Accordion, AccordionItem } from '@chakra-ui/react'

import { useCourseContext } from '../useCourseContext'
import { CourseFaqItem } from '../../CourseDetailFaqItem'

export const CourseFaqs: FC = () => {
  const { course } = useCourseContext()
  const faqs = course.faqs || []

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
