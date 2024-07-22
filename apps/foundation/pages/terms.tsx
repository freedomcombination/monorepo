import { FC } from 'react'

import { truncate } from 'lodash'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale, Term } from '@fc/types'
import { Container, Hero, Markdown } from '@fc/ui'

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
