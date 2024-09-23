import { Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale, ArchiveContent } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { ArchivePostGenAI } from '@fc/ui/components/ArchivePostGenAI'

const ArchiveContentPage = () => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const id = query.id ? +query.id : 0

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    id,
  })

  const archiveContentData = archiveContentQuery.data?.data

  return (
    <AdminLayout seo={{ title: t('archive-contents') }}>
      <Stack>
        {archiveContentData?.id && (
          // TODO: Won't work without GenPostProvider
          // GenPostProvider requires a post or hashtag prop
          <ArchivePostGenAI
            archiveContentId={archiveContentData.id}
            content={archiveContentData.content}
          />
        )}
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default ArchiveContentPage
