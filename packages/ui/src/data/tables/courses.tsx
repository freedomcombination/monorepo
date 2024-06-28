import { useRouter } from 'next/router'

import { StrapiLocale, Course } from '@fc/types'

import { localeBadgesPDF, publicationBadgePDF } from './utils'
import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useCourseColumns = (): WTableProps<Course>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    [`title_${locale}`]: {},
    [`description_${locale}`]: {},
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
      transformPDF: value => localeBadgesPDF(value as StrapiLocale[]),
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
    startDate: {
      type: 'date',
      sortable: true,
    },
    endDate: {
      type: 'date',
      sortable: true,
    },
  }
}
