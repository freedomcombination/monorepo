import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { getModelStaticPaths } from '@fc/services/common/getModelStaticPaths'
import { strapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Foundation, Job, StrapiLocale } from '@fc/types'
import { JoinTemplate } from '@fc/ui/components/JoinForm/JoinTemplate'

import { Layout } from '../../components'

type JoinPageProps = InferGetStaticPropsType<typeof getStaticProps>

const JoinPage: FC<JoinPageProps> = ({
  foundationInfo,
  jobs = [],
  defaultJobs = [],
}) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const jobTitles = jobs
    .filter(job => defaultJobs.includes(job.id))
    .map(job => job[`name_${locale}`])

  const title = `${t('join-the-team')}: ${jobTitles.join(',')}`

  return (
    <Layout seo={{ title }}>
      <JoinTemplate
        title={title}
        foundationInfo={foundationInfo}
        jobs={jobs}
        defaultJobs={defaultJobs}
      />
    </Layout>
  )
}

export const getStaticPaths = async () => {
  return await getModelStaticPaths('jobs')
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.['slug'] as string

  const foundationResponse = await strapiRequest<Foundation>({
    endpoint: 'foundations',
  })

  const foundation = foundationResponse.data?.[0]
  const foundationInfo = foundation?.[`about_${locale}`] || null

  const jobsResponse = await strapiRequest<Job>({
    endpoint: 'jobs',
    pageSize: 100,
  })

  const jobs = jobsResponse.data || []
  const defaultJobs = jobs.filter(job => job.slug === slug).map(job => job.id)

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundationInfo,
      slugs: { en: slug, nl: slug, tr: slug },
      defaultJobs,
      jobs,
    },
    revalidate: 1,
  }
}

export default JoinPage
