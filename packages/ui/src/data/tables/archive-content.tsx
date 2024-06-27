import { Badge, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { ArchiveContent, Category, Tag } from '@fc/types'

import { PublicationBadges } from '../../components'
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
      },
      publishedAt: {
        transform: value => (
          <PublicationBadges publishedAt={value as string | null} />
        ),
      },
    }
  }
