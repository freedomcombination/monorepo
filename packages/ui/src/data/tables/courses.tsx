import { useRouter } from 'next/router'

import { StrapiLocale, Course } from '@fc/types'

import { LocaleBadges, PublicationBadges, WTableProps } from '../../components'

export const useCourseColumns = (): WTableProps<Course>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    [`title_${locale}`]: {},
    [`description_${locale}`]: {},
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
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
