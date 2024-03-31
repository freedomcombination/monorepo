import { FC, useEffect, useState } from 'react'

import {
  Box,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@fc/services'
import { Art } from '@fc/types'

import { ArtAddToCollectionGrid } from './ArtAddToCollectionGrid'
import { ArtAddToCollectionModalProps } from './types'
import { Pagination } from '../../components'
import { PageHeader } from '../PageHeader'

export const ArtAddToCollectionModal: FC<ArtAddToCollectionModalProps> = ({
  isOpen,
  onClose,
  collection,
}) => {
  const [search, setSearch] = useState<string>()
  const [page, setPage] = useState(1)
  const { locale } = useRouter()

  const { data, isLoading, refetch } = useStrapiRequest<Art>({
    endpoint: 'arts',
    filters: {
      ...(search ? { [`title_${locale}`]: { $containsi: search } } : {}),
      approvalStatus: { $eq: 'approved' },
    },
    locale,
    page,
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, locale])

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={{ base: 2, lg: 4 }}>
          <ModalHeader>
            <HStack pos="sticky" top={0} zIndex="modal">
              <Box flex={1}>
                <PageHeader onSearch={setSearch}>
                  <ModalCloseButton pos="static" />
                </PageHeader>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={8}>
              {isLoading && (
                <Center>
                  <Spinner />
                </Center>
              )}
              {!isLoading && data?.data && (
                <>
                  <ArtAddToCollectionGrid
                    arts={data?.data || []}
                    collection={collection}
                    onSuccess={refetch}
                  />
                  <Pagination
                    alignSelf="center"
                    currentPage={page}
                    onPageChange={setPage}
                    totalCount={data?.meta.pagination?.pageCount as number}
                  />
                </>
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
