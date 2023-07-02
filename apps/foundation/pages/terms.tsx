import { FC } from 'react'

import { truncate } from 'lodash'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'

import { i18nConfig } from '@wsvvrijheid/config'
import { Request } from '@wsvvrijheid/lib'
import { StrapiLocale, Term } from '@wsvvrijheid/types'
import { Container, Hero, Markdown } from '@wsvvrijheid/ui'

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

  const response = await Request.single<Term>({
    url: 'api/term',
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
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
