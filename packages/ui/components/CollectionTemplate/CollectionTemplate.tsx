import { FC } from 'react'

import { Center, Spinner } from '@chakra-ui/react'

import { CollectionTemplateProps } from './types'
import { CollectionBook } from '../CollectionBook'
import { Container } from '../Container'

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
