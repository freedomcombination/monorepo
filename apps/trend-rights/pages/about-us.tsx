import { FC } from 'react'

import { Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeoProps } from 'next-seo'

import { ABOUT_US } from '@fc/config/data'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { AnimatedBox } from '@fc/ui/components/AnimatedBox'
import { Container } from '@fc/ui/components/Container'
import { Hero } from '@fc/ui/components/Hero'

import { Layout } from '../components'

type AboutUsBlockProps = {
  title: string
  image: string
  text: string
}

const AboutUsBlock: FC<AboutUsBlockProps> = props => {
  const { image, title, text } = props

  return (
    <Stack align="center" textAlign="center" maxW="lg" overflow="hidden">
      <Image src={image} alt={title} w={200} />

      <Stack p={4}>
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        <Text>{text}</Text>
      </Stack>
    </Stack>
  )
}

type AboutUsProps = InferGetStaticPropsType<typeof getStaticProps>

const AboutUs: FC<AboutUsProps> = ({ title, content, seo }) => {
  return (
    <Layout seo={seo} isDark>
      <Hero title={title} />
      <Container>
        <SimpleGrid py={16} gap={8} columns={{ base: 1, lg: 3 }}>
          {content.map(({ title, description, image }, i) => (
            <AnimatedBox directing="to-down" delay={i * 3} key={i}>
              <AboutUsBlock title={title} text={description} image={image} />
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

  const pageData = ABOUT_US[locale] as typeof ABOUT_US.en

  const seo: NextSeoProps = {
    title: pageData.title,
  }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      title: pageData.title,
      content: pageData.content,
      seo,
    },
  }
}
