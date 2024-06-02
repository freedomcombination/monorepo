import { FC } from 'react'

import { Heading, Image, VStack } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { ButtonLink, Container } from '@fc/ui'

import { Layout } from '../components'

interface HomeProps {
  seo: NextSeoProps
}

const Home: FC<HomeProps> = ({ seo }) => {
  const { t } = useTranslation()

  return (
    <Layout seo={seo}>
      <Container>
        <VStack>
          <Image boxSize={300} src={'/images/lotus-logo.svg'} alt={'lotus'} />
          <Heading
            fontFamily={'lotus'}
            fontWeight={400}
            fontSize={'7xl'}
            color={'lotus.500'}
          >
            Lotus vd Media
          </Heading>
          <ButtonLink size={'lg'} href={'/donation'} variant={'outline'}>
            {t('donation.title')}
          </ButtonLink>
        </VStack>
      </Container>
    </Layout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title: Record<string, string> = {
    en: 'Home',
    nl: 'Home',
    tr: 'Anasayfa',
  }

  return {
    props: {
      seo: { title: title[locale] },
      ...(await ssrTranslations(locale)),
    },
    revalidate: 1,
  }
}

export default Home
