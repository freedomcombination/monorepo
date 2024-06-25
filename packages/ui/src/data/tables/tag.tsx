import { Tag } from '@fc/types'

import { publicationBadgePDF } from './utils'
import { PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useTagColumns = (): WTableProps<Tag>['columns'] => {
  return {
    id: { sortable: true },
    slug: { sortable: true },
    name_en: { sortable: true },
    name_nl: { sortable: true },
    name_tr: { sortable: true },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
      transformPDF: value => publicationBadgePDF(value as string | null),
    },
  }
}
