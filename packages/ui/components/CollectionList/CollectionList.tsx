import { FC } from 'react'

import { Box, Divider, HStack, Stack, Text, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MdCollectionsBookmark } from 'react-icons/md'

import { CollectionListProps } from './types'

export const CollectionList: FC<CollectionListProps> = ({ collectionData }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Stack>
      <HStack py={1.5} w="full" align="center">
        <Box as={MdCollectionsBookmark} />
        <Text display={{ base: 'none', lg: 'block' }} fontWeight={600}>
          {t('collections')}
        </Text>
      </HStack>
      <Divider />
      {collectionData.map((collection, index) => (
        <Link
          as={NextLink}
          key={index}
          href={`/${locale}/club/collections/${collection.slug}`}
          py={2}
          lineHeight="1.15"
          _hover={{ color: 'primary.500' }}
        >
          {collection.title}
        </Link>
      ))}
    </Stack>
  )
}
