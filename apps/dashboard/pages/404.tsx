import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NotFound: FC<PageProps> = ({ seo }) => {
  return (
    <AdminLayout seo={seo}>
      <Box>Not found</Box>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Not Found',
    tr: 'Bulunamadı',
    nl: 'Niet Gevonden',
  }

  const seo = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default NotFound
