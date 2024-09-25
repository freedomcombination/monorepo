import { FC } from 'react'

import { truncate } from 'lodash'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { strapiRequest } from '@fc/services/common/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale, Term } from '@fc/types'
import { Container } from '@fc/ui/components/Container'
import { Hero } from '@fc/ui/components/Hero'
import { Markdown } from '@fc/ui/components/Markdown'

import { Layout } from '../components'

type TermsProps = InferGetStaticPropsType<typeof getStaticProps>

const Terms: FC<TermsProps> = ({ terms, seo, source }) => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={terms.title} isFullHeight={false} />
      <Container>
        <Markdown source={source} />
      </Container>
    </Layout>
  )
}

export default Terms

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const response = await strapiRequest<Term>({
    endpoint: 'term',
    locale,
  })

  const terms = response.data

  if (!terms) {
    return {
      notFound: true,
    }
  }

  const source = await serialize(terms.content || '')

  const seo = {
    title: terms.title,
    description: truncate(terms.content || '', { length: 200 }),
  }

  return {
    props: {
      terms,
      source,
      seo,
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
