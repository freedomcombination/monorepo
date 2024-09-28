import { Profile, Course, StrapiLocale } from '@fc/types'
import { getTranslate, TranslateFunc } from '../../utils/getTranslate'
import React, { FC, ReactNode } from 'react'
import { EmailProvider } from '../../EmailProvider'
import SiteLayout from '../../components/SiteLayout'
import { Section, Text, Link } from '@react-email/components'
import { getSiteLink } from '../../utils/getSiteData'
import { KeyValue } from '../../components/KeyValue'
import { translations } from '../../utils/translations'
import { EmailButton } from '../../components/Button'
import { formatDate } from '../../utils/formatDate'

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
}

export type CourseApplicantBaseProps = Omit<
  CourseApplicantLayoutProps,
  'data' | 'preview' | 'header' | 'footer'
>

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
      tKey: 'date', value:
        formatDate(date, 'dd MMMM yyyy - HH:mm ', locale)
    },
    ...data,
  ]

  return (
    <EmailProvider>
      <SiteLayout
        site={'foundation'}
        preview={t(preview, {
          name: applicant?.name || 'user name',
        })}
      >
        <Section style={{ padding: '10px' }}>
          <Text style={{ fontSize: '16px' }}>{t(header)}</Text>
        </Section>
        <Section
          style={{
            padding: '20px',
          }}
        >
          {baseData.map(({ tKey, value, url }, index) => (
            <KeyValue key={index} tKey={tKey} locale={locale}>
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
          <EmailButton
            href={getSiteLink('dashboard', locale) + 'profile/' + applicant.id}
          >
            Dashboard
          </EmailButton>
        </Section>
      </SiteLayout>
    </EmailProvider>
  )
}

export default CourseApplicantLayout
