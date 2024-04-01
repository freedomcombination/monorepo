import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs } from '@fc/lib'
import { StrapiCollectionEndpoint, StrapiModel } from '@fc/types'

import { FilterOption, RelationFilterOption } from '../../admin'

type UseRequestArgsReturn<T extends StrapiModel> = Partial<
  Record<
    StrapiCollectionEndpoint,
    {
      relationFilters?: RelationFilterOption<T>[]
      filters?: FilterOption[]
      populate?: RequestCollectionArgs<T>['populate']
      searchFields?: string[]
    }
  >
>

export const useRequestArgs = <
  T extends StrapiModel,
>(): UseRequestArgsReturn<T> => {
  const { t } = useTranslation()

  return {
    assets: {
      relationFilters: [
        {
          endpoint: 'foundations',
          field: 'foundation',
        },
      ],
      searchFields: ['name', 'description'],
    },
    hashtags: {
      searchFields: ['title'],
    },
    collections: {
      searchFields: ['title', 'description'],
    },
    posts: {
      populate: [
        'hashtag.categories',
        'hashtag.image',
        'tags',
        'image',
        'video',
        'caps',
      ],
      relationFilters: [
        {
          endpoint: 'hashtags',
          field: 'hashtag',
        },
      ],
      searchFields: ['description'],
    },
    courses: {
      relationFilters: [
        {
          endpoint: 'platforms',
          field: 'platform',
        },
      ],
    },
    foundations: { searchFields: ['title'] },
    blogs: {
      relationFilters: [
        {
          endpoint: 'profiles',
          field: 'profile',
          label: t('author'),
          // queryFilters: { ownedBlogs: { id: { $gt: 0 } } },
        },
      ],
      searchFields: ['title', 'description'],
    },
    users: {
      searchFields: ['username'],
      relationFilters: [
        {
          endpoint: 'users-permissions/roles',
          field: 'role',
        },
      ],
    },
    profiles: {
      relationFilters: [
        {
          endpoint: 'jobs',
          field: 'jobs',
        },
        {
          endpoint: 'users-permissions/roles',
          field: 'role',
        },
      ],
      filters: [
        {
          field: 'isVolunteer',
          label: t('volunteer'),
          operator: '$eq',
        },
      ],
      populate: ['user.role', 'jobs.platform'],
      searchFields: ['name', 'email'],
    },
  }
}
