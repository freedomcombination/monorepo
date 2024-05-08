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

  return {
    avatar: {
      type: 'image',
    },
    name: { sortable: true },
    isVolunteer: {
      label: 'volunteer',
      type: 'badge',
      transform: value => (value ? t('volunteer') : null),
      componentProps: {
        colorScheme: 'primary',
        variant: 'outline',
      },
    },
    status: {
      type: 'badge',
      componentProps: value => {
        const colorScheme = {
          pending: 'orange', // 'orange
          accepted: 'green',
          rejected: 'red',
          'in-progress': 'blue',
          left: 'gray',
          awaiting: 'yellow',
        }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as ProfileStatus],
        }
      },
    },
    user: {
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
    platforms: {
      transform: value =>
        (value as Platform[])?.map(job => job[`name_${locale}`]).join(', '),
      sortable: true,
      sortKey: `slug`,
    },
    jobs: {
      transform: value =>
        (value as Job[])?.map(job => job[`name_${locale}`]).join(', '),
      sortable: true,
      sortKey: `slug`,
    },
    email: { sortable: true },
    availableHours: { sortable: true },
    phone: {},
    country: { sortable: true },
    createdAt: { type: 'date', sortable: true },
  }
}
