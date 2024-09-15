import { FC } from 'react'

import { Box, Heading, Stack } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { serialize } from 'next-mdx-remote/serialize'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { Container, Hero, Markdown } from '@fc/ui'

import { Layout } from '../../../components'

type SeminarsProps = InferGetStaticPropsType<typeof getStaticProps>

const SeminarsPage: FC<SeminarsProps> = ({ source }) => {
  const { t } = useTranslation()

  const title = t('seminars')

  return (
    <Layout seo={{ title }} isDark>
      <Hero image={'/images/seminar.jpeg'} />
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
        </Stack>
      </Container>
    </Layout>
  )
}

export default SeminarsPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const content = {
    en: 'A writer said that life is not long enough to learn by living all the experiences. Since life is short, we thought that we could listen to the experiences of people with experience and mediate the transfer of these experiences to our volunteers and followers. In this respect, we conduct interviews within the FC Academy. If you want to share your experiences, you can always contact us from the contact page.',
    nl: 'Een schrijver zei dat het leven niet lang genoeg is om te leren door alle ervaringen te beleven. Aangezien het leven kort is, dachten we dat we konden luisteren naar de ervaringen van mensen met ervaring en de overdracht van deze ervaringen naar onze vrijwilligers en volgers konden bemiddelen. In dat kader voeren we gesprekken binnen de FC Academie. Als u uw ervaringen wilt delen, kunt u altijd contact met ons opnemen via de contactpagina.',
    tr: 'Hayat, bütün tecrübeleri yaşayarak öğrenilecek kadar uzun değil demiştir bir yazar. Hayat kısa olduğuna göre biz de tecrübe sahibi kişilerden onların tecrübelerini dinleyebilir, gönüllülerimize ve takipçilerimize bu tecrübelerin aktarılmasına aracılık edebiliriz diye düşündük. Bu itibarla FC Akademi bünyesinde söyleşiler yapmaktayız. Sizler de tecrübelerinizi aktarmak isterseniz her zaman bizimle iletişim sayfasından iletişime geçebilirsiniz.',
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
