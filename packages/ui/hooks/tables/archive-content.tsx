import { Badge, Group } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import type { ArchiveContent, Category, Prison, Victim } from '@fc/types'

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
        accessorKey: 'victims',
        transform: value =>
          (value as Victim[])?.map(v => `[${v.name}]`).join(', '),
      },
      {
        accessorKey: 'prisons',
        transform: value =>
          (value as Prison[])?.map(p => `[${p.slug}]`).join(', '),
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
