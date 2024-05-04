import { useEffect, useRef, useState } from 'react'

import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { ART_MOCKS, CATEGORY_MOCKS } from '@fc/mocks'
import {
  ApprovalStatus,
  Art,
  Category,
  StrapiModel,
  StrapiModelKeys,
} from '@fc/types'

import { WTableProps } from './types'
import { WTable } from './WTable'

type Story<T extends StrapiModel> = StoryObj<WTableProps<T>>

export default {
  component: WTable,
  title: 'Shared/WTable',
} as Meta<WTableProps<StrapiModel>>

const StoryWithHooks: StoryFn<WTableProps<StrapiModel>> = args => {
  const [sortKey, setSortKey] = useState<[string] | null>(null)
  const [data, setData] = useState<StrapiModel[]>(args.data)
  const initialData = useRef(data)

  useEffect(() => {
    if (!sortKey?.[0]) return setData(initialData.current)

    const [field, sort] = sortKey[0].split(':')

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[field as keyof StrapiModel] as StrapiModelKeys
      const bValue = b[field as keyof StrapiModel] as StrapiModelKeys

      if (sort === 'asc') {
        return typeof aValue === 'number' && typeof bValue === 'number'
          ? aValue > bValue
            ? 1
            : -1
          : aValue.localeCompare(bValue)
      } else if (sort === 'desc') {
        return typeof aValue === 'number' && typeof bValue === 'number'
          ? aValue < bValue
            ? 1
            : -1
          : bValue.localeCompare(aValue)
      }

      return 0
    })

    setData(sortedData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortKey])

  return (
    <WTable {...args} onSort={value => setSortKey(value || null)} data={data} />
  )
}

export const Arts: Story<Art> = {
  render: StoryWithHooks,
  args: {
    data: ART_MOCKS.data,
    columns: {
      image: {
        type: 'image',
      },
      title_en: {}, // default type is text
      approvalStatus: {
        type: 'badge',
        // Custom props based on value
        componentProps: value => {
          const colorScheme = {
            approved: 'primary',
            pending: 'yellow',
            rejected: 'red',
          }

          return {
            variant: 'outline',
            colorScheme: colorScheme[value as ApprovalStatus],
          }
        },
      },
      publishedAt: {
        type: 'date',
        componentProps: {
          format: 'dd MMMM',
        },
        sortable: true,
      },
    },
  },
}

export const Categories: Story<Category> = {
  render: StoryWithHooks,
  args: {
    data: CATEGORY_MOCKS.data,
    columns: {
      name_en: {},
      name_nl: {},
      name_tr: {},
      slug: {},
    },
  },
}
