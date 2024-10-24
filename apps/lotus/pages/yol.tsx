import { FC } from 'react'

import { AspectRatio, chakra } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'

import { Layout } from '../components'

type YolProps = InferGetStaticPropsType<typeof getStaticProps>

const Yol: FC<YolProps> = ({ seo }) => {
  return (
    <Layout seo={seo}>
      <AspectRatio ratio={16 / 9} boxSize={'full'} h={'100vh'}>
        <chakra.iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vR60smk9Z713rzT3WoAgKo7w8LGH7km25j10HwT4I0H0CDF8DhFF9GrVFVjjt8BGO7k3OWBfsfI4-zd/embed?start=false&loop=false&delayms=3000"
          boxSize={'full'}
          allowFullScreen={true}
        />
      </AspectRatio>
    </Layout>
  )
}

export default Yol

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title: Record<string, string> = {
    en: 'The Journey',
    nl: 'De Reis',
    tr: 'Yol',
  }

  return {
    props: {
      seo: { title: title[locale] },
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}
