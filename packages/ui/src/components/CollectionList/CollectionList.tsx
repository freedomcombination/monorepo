import { FC } from 'react'

import {
  Box,
  Separator,
  HStack,
  Stack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Link from 'next/link'
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
      <Separator />
      {collectionData.map((collection, index) => (
        <ChakraLink
          key={index}
          asChild
          py={2}
          lineHeight="1.15"
          _hover={{ color: 'primary.500' }}
        >
          <Link href={`/${locale}/club/collections/${collection.slug}`}>
            {collection.title}
          </Link>
        </ChakraLink>
      ))}
    </Stack>
  )
}
