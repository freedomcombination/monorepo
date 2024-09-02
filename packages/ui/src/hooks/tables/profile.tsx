import { ThemeTypings } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Profile, Role, User, Job, Platform, ProfileStatus } from '@fc/types'

import { WTableProps } from '../../components'

export const useProfileColumns = (): WTableProps<
  Profile & { role: Role }
>['columns'] => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return [
    {
      accessorKey: 'avatar',
      type: 'image',
    },
    { accessorKey: 'name', sortable: true },
    {
      accessorKey: 'isVolunteer',
      label: 'volunteer',
      type: 'badge',
      transform: value => (value ? t('volunteer') : null),
      componentProps: {
        colorScheme: 'primary',
        variant: 'outline',
      },
    },
    {
      accessorKey: 'profileStatus',
      type: 'badge',
      componentProps: value => {
        const colorScheme: Record<ProfileStatus, ThemeTypings['colorSchemes']> =
          {
            pending: 'orange', // 'orange
            accepted: 'blue',
            rejected: 'red',
            'in-progress': 'purple',
            left: 'gray',
            awaiting: 'yellow',
            approved: 'green',
          }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as ProfileStatus],
        }
      },
    },
    {
      accessorKey: 'user',
      label: 'role',
      transform: value => (value as User)?.role?.name,
      sortable: true,
      sortKey: 'role.name',
      type: 'badge',
      componentProps: value => {
        const rolesColorMap: Record<string, ThemeTypings['colorSchemes']> = {
          'ArtEditor Translator': 'pink',
          'Author Translator': 'facebook',
          'ContentManager Translator': 'orange',
          AcademyEditor: 'blue',
          AccountManager: 'cyan',
          Admin: 'primary',
          All: 'gray',
          ArtEditor: 'purple',
          Authenticated: 'gray',
          Author: 'facebook',
          ContentManager: 'orange',
          'Kunsthalte Coordinator': 'teal',
          Jury: 'yellow',
          Public: 'gray',
          'Platform Coordinator': 'green',
          Translator: 'whatsapp',
        }

        return {
          colorScheme: rolesColorMap[value as keyof typeof rolesColorMap],
          variant: 'outline',
        }
      },
    },
    {
      accessorKey: 'platforms',
      transform: value =>
        (value as Platform[])?.map(job => job[`name_${locale}`]).join(', '),
      sortable: true,
      sortKey: `slug`,
    },
    {
      accessorKey: 'jobs',
      transform: value =>
        (value as Job[])?.map(job => job[`name_${locale}`]).join(', '),
      sortable: true,
      sortKey: `slug`,
    },
    { accessorKey: 'email', sortable: true },
    { accessorKey: 'availableHours', sortable: true },
    { accessorKey: 'phone' },
    { accessorKey: 'country', sortable: true },
    { accessorKey: 'createdAt', type: 'date', sortable: true },
  ]
}
