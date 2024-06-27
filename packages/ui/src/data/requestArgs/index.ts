import { useTranslation } from 'next-i18next'

import { RequestCollectionArgs } from '@fc/lib'
import { StrapiCollectionEndpoint, StrapiModel } from '@fc/types'

import { FilterOption, RelationFilterOption } from '../../components'

type UseRequestArgsReturn<T extends StrapiModel> = Partial<
  Record<
    StrapiCollectionEndpoint,
    {
      relationFilters?: RelationFilterOption<T>[]
      booleanFilters?: FilterOption[]
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
      booleanFilters: [
        {
          field: 'isVolunteer',
          label: t('volunteer'),
          operator: '$eq',
        },
        {
          field: '(ext)isVolunteer',
          label: t('profile'),
          operator: '$null',
        },
      ],
      relationFilters: [
        {
          endpoint: 'jobs',
          field: 'jobs',
        },
        {
          endpoint: 'users-permissions/roles',
          field: 'user.role',
          label: t('role'),
        },
        {
          endpoint: 'platforms',
          field: 'platforms',
        },
      ],
      populate: ['user.role', 'jobs.platform', 'platforms'],
      searchFields: ['name', 'email'],
    },
  }
}
