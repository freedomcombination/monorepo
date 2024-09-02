import { useRouter } from 'next/router'

import { Course, StrapiLocale } from '@fc/types'

import { localeBadgesPDF, publicationBadgePDF } from './utils'
import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const useCourseColumns = (): WTableProps<Course>['columns'] => {
  const { locale } = useRouter()

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
      transformPDF: value => localeBadgesPDF(value as StrapiLocale[]),
    },
    {
      accessorKey: 'publishedAt',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
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
