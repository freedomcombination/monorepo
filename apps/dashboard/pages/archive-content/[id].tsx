import { Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'
import { AdminLayout, ArchivePostGenAI } from '@wsvvrijheid/ui'

export default function ArchiveContent() {
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const archiveContentId = query.id

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      id: { $eq: archiveContentId },
    },
    locale,
  })

  const archiveContentData = archiveContentQuery.data?.data[0]

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