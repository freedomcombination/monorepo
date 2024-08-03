import { FC } from 'react'

import { truncate } from 'lodash'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { Privacy, StrapiLocale } from '@fc/types'
import { Container, Hero, Markdown } from '@fc/ui'

import { Layout } from '../components'

type PrivacyProps = InferGetStaticPropsType<typeof getStaticProps>

const PrivacyPage: FC<PrivacyProps> = ({ privacy, seo, source }) => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={privacy.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default PrivacyPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const response = await strapiRequest<Privacy>({
    endpoint: 'privacy',
    locale,
  })

  const privacy = response?.data

  if (!privacy) {
    return {
      notFound: true,
    }
  }

  const source = await serialize(privacy.content || '')

  const seo = {
    title: privacy.title,
    description: truncate(privacy.content || '', { length: 200 }),
  }

  return {
    props: {
      privacy,
      source,
      seo,
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
