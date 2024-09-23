import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@fc/services/common/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale, Timeline } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { TimelineBoard } from '@fc/ui/components/TimelineBoard'

const Timelines = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const { data: timelines, isLoading } = useStrapiRequest<Timeline>({
    endpoint: 'timelines',
    locale,
  })

  return (
    <AdminLayout seo={{ title: t('timelines') }} loading={isLoading}>
      {timelines?.data && <TimelineBoard timelines={timelines?.data} />}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default Timelines
