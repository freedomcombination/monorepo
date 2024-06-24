import { Category } from '@fc/types'

import { PublicationBadges, publicationBadgePDF } from '../../admin'
import { WTableProps } from '../../components'

export const useCategoryColumns = (): WTableProps<Category>['columns'] => {
  return {
    id: { sortable: true },
    slug: { sortable: true },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
  }
}
