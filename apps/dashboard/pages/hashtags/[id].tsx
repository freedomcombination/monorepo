import { useDisclosure } from '@chakra-ui/hooks'
import { Center, Spinner } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaPencil } from 'react-icons/fa6'

import { Button } from '@fc/chakra'
import { strapiRequest } from '@fc/lib'
import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Hashtag, StrapiLocale } from '@fc/types'
import { AdminLayout, ModelEditModal, TabbedGenAIView } from '@fc/ui'

const HashtagPage = () => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const { open, onOpen, onClose } = useDisclosure()

  const id = query.id ? +query.id : 0

  const hashtagQuery = useStrapiRequest<Hashtag>({
    endpoint: 'hashtags',
    id,
  })

  const hashtag = hashtagQuery.data?.data

  const handleSuccess = async () => {
    onClose()
    await hashtagQuery.refetch()
  }

  if (!hashtag) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    )
  }

  return (
    <AdminLayout seo={{ title: hashtag.title }}>
      <ModelEditModal
        isOpen={open}
        onClose={onClose}
        endpoint="hashtags"
        id={hashtag.id}
        title={hashtag.title}
        onSuccess={handleSuccess}
      />
      <TabbedGenAIView
        hashtag={hashtag}
        alertContent={
          <Button
            colorPalette={'orange'}
            variant={'outline'}
            onClick={onOpen}
            leftIcon={<FaPencil />}
          >
            {t('edit')}
          </Button>
        }
      />
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.query.id ? +context.query.id : 0

  const queryClient = new QueryClient()

  const queryKey = Object.entries({ endpoint: 'hashtags', id })

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => strapiRequest<Hashtag>({ endpoint: 'hashtags', id }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}

export default HashtagPage
