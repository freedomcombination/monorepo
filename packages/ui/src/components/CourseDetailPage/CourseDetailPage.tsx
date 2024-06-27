import { FC } from 'react'

import { Box, Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { SITE_URL } from '@fc/config'

import { CourseApplicationForm } from './CourseApplicationForm'
import { CourseFaqs } from './CourseFaqs'
import { CourseInfo } from './CourseInfo'
import { CourseDetailPageProps } from './types'
import { Container } from '../Container'
import { Markdown } from '../Markdown'
import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

export const CourseDetailPage: FC<CourseDetailPageProps> = ({
  course,
  courses,
  source,
}) => {
  const { locale, asPath } = useRouter()

  const { t } = useTranslation()

  const title = course[`title_${locale || 'nl'}`]
  const description = course[`description_${locale || 'nl'}`]

  const URL = `${SITE_URL}/${locale}${asPath}`

  return (
    <Container maxW={'6xl'}>
      <Stack spacing={12} pb={16} pt={4}>
        <Stack spacing={4}>
          <WImage ratio={16 / 9} src={course.image} alt="" />

          <Stack
            justify={'space-between'}
            flexDir={{ base: 'column', md: 'row' }}
          >
            <CourseInfo course={course} />

            <ShareButtons
              size={'md'}
              title={title}
              quote={description}
              url={URL}
            />
          </Stack>
        </Stack>

        <Heading as={'h1'} size={'2xl'} textAlign={'center'} py={8}>
          {title}
        </Heading>

        <Box>
          <Markdown source={source} />
        </Box>

        <Stack
          spacing={8}
          maxW={'3xl'}
          w={'full'}
          p={8}
          borderWidth={1}
          rounded={'md'}
          alignSelf={'center'}
          bg={'white'}
        >
          <Heading as={'h3'} size={'lg'}>
            {t('course.application-title')}
          </Heading>
          <CourseApplicationForm courseId={course.id} />
        </Stack>

        <Stack spacing={4}>
          <Heading as={'h3'} size={'lg'}>
            {t('faq')}
          </Heading>
          <CourseFaqs faqs={course.faqs || []} />
        </Stack>

        {courses?.length > 0 && (
          <Stack spacing={4}>
            <Heading as={'h3'} size={'lg'}>
              {t('course.other-courses')}
            </Heading>
            {/* TODO: Add courses grid */}
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
