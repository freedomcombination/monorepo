import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Course, StrapiLocale } from '@fc/types'

import { renderJoinedLocales, renderPublicationState } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const useCourseColumns = (): WTableProps<Course>['columns'] => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return [
    { accessorKey: 'image', type: 'image' },
    {
      accessorKey: `title_${locale}`,
    },
    {
      accessorKey: `description_${locale}`,
    },
    {
      accessorKey: 'translates',
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
      transformPDF: value => renderJoinedLocales(value as StrapiLocale[]),
    },
    {
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => renderPublicationState(value as string | null, t),
    },
    {
      accessorKey: 'startDate',
      type: 'date',
      sortable: true,
    },
    {
      accessorKey: 'endDate',
      type: 'date',
      sortable: true,
    },
  ]
}
