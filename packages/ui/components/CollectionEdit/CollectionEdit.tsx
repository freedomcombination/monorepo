import { FC } from 'react'

import { Text } from '@chakra-ui/react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@fc/chakra'
import type { Collection } from '@fc/types'

import { CollectionEditProps } from './types'
import { ModelEditForm } from '../ModelEditForm'

export const CollectionEdit: FC<CollectionEditProps> = ({
  collection,
  onSuccess,
}) => {
  return (
    <Accordion size={'lg'} collapsible borderColor="transparent">
      <AccordionItem value="1">
        <AccordionButton
          justifyContent="space-between"
          cursor="pointer"
          fontSize="xl"
        >
          <Text fontWeight={700} lineClamp={1}>
            {collection.title}
          </Text>

          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0} mt={4}>
          <ModelEditForm<Collection>
            endpoint="collections"
            model={collection}
            translatedFields={['title', 'description', 'content']}
            onSuccess={onSuccess}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
