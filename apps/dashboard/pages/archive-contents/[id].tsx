import { Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { ArchiveContent } from '@fc/types/src/archive-content'
import { AdminLayout, ArchivePostGenAI } from '@fc/ui'

export default function ArchiveContentPage() {
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
