import { FC } from 'react'

import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'

import { SITE_URL } from '@fc/config'
import { getCourseBySlug } from '@fc/services'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { StrapiLocale } from '@fc/types'
import { CourseDetailPage } from '@fc/ui'
import { mapStrapiFileToOgImages } from '@fc/utils'

import { Layout } from '../../components'

type CoursePageProps = InferGetStaticPropsType<typeof getServerSideProps>

const CoursePage: FC<CoursePageProps> = ({ seo, source, course }) => {
  return (
    <Layout seo={seo}>
      {course && (
        <CourseDetailPage source={source} course={course} courses={[]} />
      )}
    </Layout>
  )
}

export default CoursePage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context
  const queryClient = new QueryClient()

  const locale = context.locale as StrapiLocale

  const course = await getCourseBySlug(params?.slug as string)

  if (!course)
    return {
      notFound: true,
    }

  const title = course[`title_${locale}`] || ''
  const description = course[`description_${locale}`] || ''
  const content = course[`content_${locale}`] || ''
  const slug = course.slug

  const source = await serialize(content || '')

  const image = course.image

  const seo = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/courses/${slug}`,
      images: mapStrapiFileToOgImages(image, title),
    },
  }

  return {
    props: {
      seo,
      source,
      course,
      slugs: { en: slug, nl: slug, tr: slug },
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
