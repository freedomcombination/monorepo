import { Course, CourseApplication, Profile, StrapiLocale } from '@fc/types'
import { Link, Section, Text } from '@react-email/components'
import React, { FC, ReactNode } from 'react'
import { EmailProvider } from '../../EmailProvider'
import { EmailButton } from '../../components/Button'
import { KeyValue } from '../../components/KeyValue'
import { formatDate } from '../../utils/formatDate'
import { getSiteLink } from '../../utils/getSiteData'
import { getTranslate, TranslateFunc } from '../../utils/getTranslate'
import { translations } from '../../utils/translations'

export type CourseApplicationKV = {
  tKey: keyof typeof translations
  value: ReactNode
  url?: string
}

type CourseApplicantLayoutProps = {
  applicant: Profile
  course: Course
  date: string
  t: TranslateFunc
  data?: CourseApplicationKV[]
  preview: keyof typeof translations
  header: keyof typeof translations
  footer: keyof typeof translations
  noButton?: boolean
}

export type CourseApplicantBaseProps = {
  application: CourseApplication
  t: TranslateFunc
}

const CourseApplicantLayout: FC<CourseApplicantLayoutProps> = ({
  applicant = {
    name: 'John Doe',
    email: 'john.doe@fc.com',
    id: 1,
  } as Profile,
  course = {
    id: 1,
    slug: 'some.important.course',
    title_en: 'Some important course',
    title_nl: 'Some important course',
    title_tr: 'Some important course',
  } as Course,
  date = new Date().toString(),
  t = getTranslate('en').t,
  preview = 'Course Applicant Preview' as keyof typeof translations,
  header = 'Course Applicant Header' as keyof typeof translations,
  footer = 'Course Applicant Footer' as keyof typeof translations,
  data = [],
  noButton = false,
}) => {
  const locale = t() as StrapiLocale
  const baseData: CourseApplicationKV[] = [
    {
      tKey: 'name',
      value: applicant.name ?? 'unknown username',
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
    {
      tKey: 'date',
      value: formatDate(date, 'dd MMMM yyyy - HH:mm ', locale),
    },
    ...data,
  ]

  return (
    <EmailProvider
      site={'foundation'}
      preview={t(preview, {
        name: applicant?.name || 'user name',
      })}
      heading={t(header)}
    >
      <Section>
        {baseData.map(({ tKey, value, url }, index) => (
          <KeyValue key={index} title={t(tKey)}>
            {url ? (
              <Link href={url}>{value}</Link>
            ) : typeof value === 'string' ? (
              <Text style={{ fontWeight: 'bold' }}>{value}</Text>
            ) : (
              value
            )}
          </KeyValue>
        ))}
      </Section>
      <Section style={{ padding: '10px' }}>
        <Text style={{ fontSize: '16px' }}>{t(footer)}</Text>
        {!noButton && (
          <EmailButton
            href={getSiteLink('dashboard', locale) + 'profile/' + applicant.id}
          >
            Dashboard
          </EmailButton>
        )}
      </Section>
    </EmailProvider>
  )
}

export default CourseApplicantLayout
