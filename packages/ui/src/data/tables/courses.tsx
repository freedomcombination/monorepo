import { StrapiLocale, Course } from '@fc/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useCourseColumns = (): WTableProps<Course>['columns'] => {
  return {
    image: { type: 'image' },
    title: { sortable: true },
    description: {},
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
