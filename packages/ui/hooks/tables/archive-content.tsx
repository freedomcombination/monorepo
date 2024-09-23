import { Badge, Group } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type { ArchiveContent, Category, Tag } from '@fc/types'

import { renderPublicationState } from './utils'
import { PublicationBadges } from '../../components/PublicationBadges'
import type { WTableProps } from '../../components/WTable'

export const useArchiveContentColumns =
  (): WTableProps<ArchiveContent>['columns'] => {
    const { locale } = useRouter()
    const { t } = useTranslation()

    return [
      { accessorKey: 'id', sortable: true },
      { accessorKey: 'title', sortable: true },
      { accessorKey: 'source', sortable: true },
      { accessorKey: 'link', sortable: true },
      {
        accessorKey: 'date',
        type: 'date',
        sortable: true,
      },
      {
        accessorKey: 'categories',
        transform: value => (
          <Group wrap={'wrap'}>
            {(value as Category[])
              ?.sort((a, b) =>
                a[`name_${locale}`].localeCompare(b[`name_${locale}`]),
              )
              ?.map(c => (
                <Badge variant={'outline'} key={c.id}>
                  {c[`name_${locale}`]}
                </Badge>
              ))}
          </Group>
        ),
        transformPDF: value =>
          (value as Category[])
            ?.sort((a, b) =>
              a[`name_${locale}`].localeCompare(b[`name_${locale}`]),
            )
            ?.map(c => `[${c[`name_${locale}`]}]`)
            .join(', '),
      },
      {
        accessorKey: 'tags',
        transform: value => (
          <Group wrap={'wrap'}>
            {(value as Tag[])?.map(t => (
              <Badge variant={'outline'} key={t.id}>
                {t[`name_${locale}`]}
              </Badge>
            ))}
          </Group>
        ),
        transformPDF: value =>
          (value as Tag[])?.map(t => `[${t[`name_${locale}`]}]`).join(', '),
      },
      {
        accessorKey: 'publishedAt',
        transform: value => (
          <PublicationBadges publishedAt={value as string | null} />
        ),
        transformPDF: value =>
          renderPublicationState(value as string | null, t),
      },
    ]
  }
