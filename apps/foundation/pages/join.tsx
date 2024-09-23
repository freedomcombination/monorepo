import { FC } from 'react'

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'

import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Foundation, Job, StrapiLocale } from '@fc/types'
import { JoinTemplate } from '@fc/ui'

import { Layout } from '../components'

type JoinPageProps = InferGetStaticPropsType<typeof getStaticProps>

const JoinPage: FC<JoinPageProps> = ({ foundationInfo, jobs }) => {
  const { t } = useTranslation()

  const title = t('join-the-team')

  return (
    <Layout seo={{ title }}>
      <JoinTemplate title={title} foundationInfo={foundationInfo} jobs={jobs} />
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const foundationResponse = await strapiRequest<Foundation>({
    endpoint: 'foundations',
  })

  const foundation = foundationResponse.data?.[0]
  const foundationInfo = await serialize(foundation?.[`about_${locale}`] || '')

  const jobsResponse = await strapiRequest<Job>({
    endpoint: 'jobs',
    pageSize: 100,
  })

  const jobs = jobsResponse.data || []

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundationInfo,
      jobs,
    },
  }
}

export default JoinPage
