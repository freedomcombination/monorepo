import { Badge, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { ArchiveContent, Category, Tag } from '@fc/types'

import { publicationBadgePDF } from './utils'
import { PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useArchiveContentColumns =
  (): WTableProps<ArchiveContent>['columns'] => {
    const { locale } = useRouter()

    return {
      id: { sortable: true },
      title: { sortable: true },
      source: { sortable: true },
      link: { sortable: true },
      date: {
        type: 'date',
        sortable: true,
      },
      categories: {
        transform: value => (
          <Wrap>
            {(value as Category[])
              ?.sort((a, b) =>
                a[`name_${locale}`].localeCompare(b[`name_${locale}`]),
              )
              ?.map(c => (
                <Badge variant={'outline'} key={c.id}>
                  {c[`name_${locale}`]}
                </Badge>
              ))}
          </Wrap>
        ),
        transformPDF: value =>
          (value as Category[])
            ?.sort((a, b) =>
              a[`name_${locale}`].localeCompare(b[`name_${locale}`]),
            )
            ?.map(c => `[${c[`name_${locale}`]}]`)
            .join(', '),
      },
      tags: {
        transform: value => (
          <Wrap>
            {(value as Tag[])?.map(t => (
              <Badge variant={'outline'} key={t.id}>
                {t[`name_${locale}`]}
              </Badge>
            ))}
          </Wrap>
        ),
        transformPDF: value =>
          (value as Tag[])?.map(t => `[${t[`name_${locale}`]}]`).join(', '),
      },
      publishedAt: {
        transform: value => (
          <PublicationBadges publishedAt={value as string | null} />
        ),
        transformPDF: value => publicationBadgePDF(value as string | null),
      },
    }
  }
