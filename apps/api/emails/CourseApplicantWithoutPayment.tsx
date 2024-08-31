import { Course, Profile, StrapiLocale } from '@fc/types'
import { Text, Section, Row, Column, Link } from '@react-email/components'
import React from 'react'
import { FC } from 'react'
import { EmailProvider } from './EmailProvider'
import { getTranslate } from './utils/getTranslate'
import SiteLayout from './components/SiteLayout'
import { translations } from './utils/translations'
import { format } from 'date-fns'
import { getSiteLink } from './utils/getSiteData'

type CourseApplicantWithoutPaymentProps = {
  applicant: Profile
  course: Course
  date?: string
  explanation: string
  locale?: StrapiLocale
}

const CourseApplicantWithoutPayment: FC<CourseApplicantWithoutPaymentProps> = ({
  applicant = {
    name: 'user name',
    email: 'user email',
    id: 1,
  } as Profile,
  course = {
    id: 1,
    slug: 'slug',
    title_en: 'course title',
    title_nl: 'course title',
    title_tr: 'course title',
  } as Course,
  date = '2022-01-01 00:00:00',
  explanation = 'no explanation',
  locale = 'en',
}) => {
  const { t } = getTranslate(locale)
  const data: {
    tKey: keyof typeof translations
    value: string
    url?: string
  }[] = [
    {
      tKey: 'name',
      value: applicant.name,
      url:
        getSiteLink('dashboard', locale) +
        `courses/${course.id}?applicantId=${applicant.id}`,
    },
    { tKey: 'email', value: applicant.email, url: 'mailto:' + applicant.email },
    {
      tKey: 'course',
      value:
        course[`title_${locale}`] ||
        course.title_en ||
        course.title_nl ||
        course.title_tr,
      url: getSiteLink('foundation', locale) + 'courses/' + course.slug,
    },
    { tKey: 'date', value: format(date, 'dd/MM/yyyy HH:mm') },
    { tKey: 'details', value: explanation },
  ]

  return (
    <EmailProvider>
      <SiteLayout
        site={'foundation'}
        preview={t('course-applicant-unpaid-preview', {
          name: applicant?.name || 'user name',
        })}
      >
        <Section>
          <Text
            style={{
              padding: '10px',
              fontSize: '16px',
            }}
          >
            {t('course-applicant-unpaid-header')}
          </Text>
        </Section>
        <Section
          style={{
            padding: '20px',
            gap: '4px',
          }}
        >
          {data.map(({ tKey, value, url }) => (
            <Row key={tKey} style={{ alignItems: 'flex-start' }}>
              <Column style={{ textAlign: 'right', width: '80px' }}>
                <Text>{t(tKey)} :</Text>
              </Column>
              <Column>
                <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>
                  {url ? <Link href={url}>{value}</Link> : value}
                </Text>
              </Column>
            </Row>
          ))}
        </Section>
        <Section
          style={{
            padding: '10px',
          }}
        >
          <Text style={{ fontSize: '16px' }}>
            {t('course-applicant-unpaid-footer')}
          </Text>
          <Link
            href={getSiteLink('dashboard', locale) + 'profile/' + applicant.id}
          >
            Dashboard
          </Link>
        </Section>
      </SiteLayout>
    </EmailProvider>
  )
}

export default CourseApplicantWithoutPayment
