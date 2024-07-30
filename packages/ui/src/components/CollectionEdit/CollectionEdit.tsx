import { FC } from 'react'

import { Accordion, Text } from '@chakra-ui/react'

import { Collection } from '@fc/types'

import { CollectionEditProps } from './types'
import { ModelEditForm } from '../ModelEditForm'

export const CollectionEdit: FC<CollectionEditProps> = ({
  collection,
  onSuccess,
}) => {
  return (
    <Accordion.Root
      size={'lg'}
      allowToggle
      defaultIndex={0}
      borderColor="transparent"
    >
      <Accordion.Item>
        <Accordion.ItemTrigger
          justifyContent="space-between"
          cursor="pointer"
          fontSize="xl"
        >
          <Text fontWeight={700} lineClamp={1}>
            {collection.title}
          </Text>

          <Accordion.ItemIndicator ml={'auto'} />
        </Accordion.ItemTrigger>
        <Accordion.ItemContent p={0} mt={4}>
          <ModelEditForm<Collection>
            endpoint="collections"
            model={collection}
            translatedFields={['title', 'description', 'content']}
            onSuccess={onSuccess}
          />
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
