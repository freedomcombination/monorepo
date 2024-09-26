import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { API_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'

export type NotificationPayload = {
  title: string
  message: string
  roleIds?: number[]
  profileIds?: number[]
}

export const sendPushNotification = async (
  data: NotificationPayload,
  token: string,
) => {
  const { title, message, roleIds, profileIds } = data

  const body = {
    payload: { title, message },
    roleIds,
    profileIds,
  }

  try {
    return axios.post('api/notify', body, {
      baseURL: API_URL,
      ...(token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    })
  } catch (error) {
    console.error('Could not send notification: ', error)
  }
}

export const useSendPushNotificationMutation = () => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['send-notification'],
    mutationFn: (data: NotificationPayload) =>
      sendPushNotification(data, token as string),
  })
}
