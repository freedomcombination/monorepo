import { FC } from 'react'

import { Box, Heading, Stack } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { ButtonLink, Container, Hero, Markdown } from '@fc/ui'

import { Layout } from '../../../components'

export type SoftwareProps = InferGetStaticPropsType<typeof getStaticProps>

const SoftwarePage: FC<SoftwareProps> = ({ source }) => {
  const { t } = useTranslation()

  const title = t('software')

  return (
    <Layout seo={{ title }} isDark>
      <Hero image={'/images/software-card.jpeg'} />
      <Container>
        <Stack mb={4}>
          <Box>
            <Heading pt={8} pb={5} as="h1" fontSize="4xl" textAlign="center">
              {title}
            </Heading>
          </Box>
          <Box>
            <Markdown source={source} />
          </Box>
          <ButtonLink
            href={`/join`}
            w="max-content"
            size="lg"
            colorScheme={'primary'}
            variant="link"
            alignSelf={'flex-end'}
            fontWeight={700}
          >
            {t('join-the-team')}
          </ButtonLink>
        </Stack>
      </Container>
    </Layout>
  )
}

export default SoftwarePage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const content = {
    en: 'With the developing technology, the biggest need is software. The more effectively you can use the software, the more successful you will be in fulfilling your goals. For these purposes, we have established a software team consisting of our volunteer software developers. They selflessly support us. Below you will see the software projects produced by our foundation and those who contributed to it. <br/>We use technologies such as javascript, react, next.js, strapi, chakra-ui in our software projects. If you have received basic education in these areas and want to gain experience, we welcome you to our team.',
    nl: 'Met de zich ontwikkelende technologie is software de grootste behoefte. Hoe effectiever u de software kunt gebruiken, hoe succesvoller u zult zijn in het bereiken van uw doelen. Voor deze doeleinden hebben we een softwareteam opgericht dat bestaat uit onze vrijwillige softwareontwikkelaars. Ze steunen ons belangeloos. Hieronder ziet u de softwareprojecten die door onze stichting zijn geproduceerd en degenen die hieraan hebben bijgedragen. <br/>We gebruiken technologieën zoals javascript, react, next.js, strapi, chakra-ui in onze softwareprojecten. Heb je een basisopleiding genoten op deze gebieden en wil je ervaring opdoen, dan heten we je van harte welkom in ons team.',
    tr: 'Gelişen teknolojiyle birlikte en büyük ihtiyaç yazılım olmaktadır. Yazılımdan ne kadar etkin bir şekilde faydalanabilirseniz amaçlarınızı yerine getirmede de o kadar başarılı olursunuz. Biz de bu amaçlarla gönüllü yazılımcılarımızdan oluşan yazılım ekibi kurduk. Kendileri fedakarca bize destek olmaktadırlar. Aşağıda vakfımız bünyesinde üretilen yazılım projelerini ve buna katkı verenleri göreceksiniz. <br/>Yazılım projelerimizde javascript, react, next.js, strapi, chakra-ui gibi teknolojileri kullanmaktayız. Eğer bu alanlarda temel seviyede eğitim aldınız ve tecrübe kazanmak istiyorsanız ekibimize bekleriz.',
  }

  const source = await serialize(content[locale])

  return {
    props: {
      ...(await ssrTranslations(locale)),
      source,
    },
    revalidate: 1,
  }
}
