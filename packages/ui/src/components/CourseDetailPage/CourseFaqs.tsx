import { FC } from 'react'

import { Accordion } from '@chakra-ui/react'

import { CourseFaqsProps } from './types'
import { CourseFaqItem } from '../CourseDetailFaqItem'

export const CourseFaqs: FC<CourseFaqsProps> = ({ faqs }) => {
  return (
    <Accordion.Root allowMultiple>
      {faqs.map(item => (
        <Accordion.Item key={item.id}>
          {/* TODO: Fix isExpanded */}
          <CourseFaqItem item={item} isExpanded={false} />
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
