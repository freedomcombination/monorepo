import { FC } from 'react'

import { useTranslation } from 'next-i18next'
import { FiSend } from 'react-icons/fi'

import { useSendNotificationMutation } from '@fc/services'

import { ActionButton } from '../../components'
import { Option } from '../ModelForm'

type SendNotificationButtonProps = {
  title: string
  message: string
  roles: Option[]
  profiles: Option[]
}

export const SendNotificationButton: FC<SendNotificationButtonProps> = ({
  title,
  message,
  roles,
  profiles,
}) => {
  const { t } = useTranslation()

  const roleIds = (roles as Option[])?.map(role => +role.value)
  const profileIds = (profiles as Option[])?.map(profile => +profile.value)

  const sendNotificationMutation = useSendNotificationMutation()

  const sendNotification = async () => {
    sendNotificationMutation.mutate({
      title,
      message,
      roleIds,
      profileIds,
    })
  }

  return (
    <ActionButton
      onClick={sendNotification}
      leftIcon={<FiSend />}
      fontSize="sm"
      colorScheme={'blue'}
      type="button"
      isLoading={sendNotificationMutation.isPending}
    >
      {t('notification.send')}
    </ActionButton>
  )
}
