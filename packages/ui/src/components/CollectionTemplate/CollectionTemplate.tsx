import { FC, LegacyRef } from 'react'

import { Center, Spinner } from '@chakra-ui/react'

import { Collection } from '@fc/types'

import { CollectionBook } from '../CollectionBook'
import { Container } from '../Container'

export type CollectionTemplateProps = {
  isLoading: boolean
  height: number
  width: number
  pageShow: number
  collection: Collection
  centerRef?: LegacyRef<HTMLDivElement>
}

export const CollectionTemplate: FC<CollectionTemplateProps> = ({
  centerRef,
  isLoading,
  height,
  width,
  pageShow,
  collection,
}) => {
  return (
    <Container minH="inherit">
      <Center ref={centerRef} py={8} minH="inherit">
        {isLoading || !height ? (
          <Spinner />
        ) : (
          <CollectionBook
            collection={collection}
            flipboxProps={{
              height,
              minHeight: height,
              width: width / pageShow,
              minWidth: width / pageShow,
            }}
          />
        )}
      </Center>
    </Container>
  )
}
