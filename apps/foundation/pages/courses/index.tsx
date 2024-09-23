import { FC } from 'react'

import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { COURSES } from '@fc/config/data'
import { strapiRequest } from '@fc/lib/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Course, StrapiLocale } from '@fc/types'
import { AcademyCard } from '@fc/ui/components/AcademyCard'
import { Container } from '@fc/ui/components/Container'
import { Hero } from '@fc/ui/components/Hero'

import { Layout } from '../../components/Layout'

type CoursesProps = InferGetStaticPropsType<typeof getStaticProps>

const Platforms: FC<CoursesProps> = ({ courses }) => {
  const { locale } = useRouter()
  const courseBody = COURSES.info?.[locale]?.title
  const courseMainTitle = COURSES.info?.[locale]?.pagetitle

  const { t } = useTranslation()

  const title = t('courses')

  const coursesData = courses?.data

  return (
    <Layout seo={{ title }}>
      <Hero image={'/images/courses.png'} />
      <Container>
        <Stack mb={4}>
          <Box>
            <Heading pt={8} pb={5} as="h1" fontSize="4xl" textAlign="center">
              {courseMainTitle}
            </Heading>
          </Box>
          <Box>
            <Text>{courseBody}</Text>
          </Box>
          <Box>
            <Heading pt={8} pb={5} as="h4" fontSize="2xl">
              {title}
            </Heading>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            gap={{ base: 6, lg: 8 }}
          >
            {coursesData?.map(course => {
              const title = course?.[`title_${locale}`]
              const description = course?.[`description_${locale}`]

              return (
                <AcademyCard
                  key={course?.id}
                  title={title}
                  image={course?.image}
                  href={`/courses/${course?.slug}`}
                  description={description}
                />
              )
            })}
          </SimpleGrid>
        </Stack>
      </Container>
    </Layout>
  )
}

export default Platforms

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const courses = await strapiRequest<Course>({
    endpoint: 'courses',
  })

  return {
    props: {
      ...(await ssrTranslations(locale)),
      courses,
    },
    revalidate: 1,
  }
}
