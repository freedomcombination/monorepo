import { FC } from 'react'

import { Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { ABOUT_US } from '@fc/config'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { AnimatedBox, Container, Hero } from '@fc/ui'

import { Layout } from '../components'

type AboutUsProps = InferGetStaticPropsType<typeof getStaticProps>
type AboutUsBlockProps = Pick<
  AboutUsProps['content'][number],
  'title' | 'image' | 'description'
>

const AboutUsBlock: FC<AboutUsBlockProps> = ({ image, title, description }) => {
  return (
    <Stack align="center" textAlign="center" maxW="lg" overflow="hidden">
      <Image src={image} alt={title} w={200} />

      <Stack p={4}>
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Stack>
    </Stack>
  )
}

const AboutUs: FC<AboutUsProps> = ({ title, content }) => {
  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      <Container>
        <SimpleGrid py={16} gap={8} columns={{ base: 1, lg: 3 }}>
          {content.map(({ title, description, image }, i) => (
            <AnimatedBox directing="to-down" delay={i * 3} key={i}>
              <AboutUsBlock
                title={title}
                description={description}
                image={image}
              />
            </AnimatedBox>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default AboutUs

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const pageData = ABOUT_US[locale]

  return {
    props: {
      ...(await ssrTranslations(locale)),
      title: pageData.title,
      content: pageData.content,
    },
  }
}
