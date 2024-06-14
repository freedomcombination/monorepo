import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'

export type NotificationPayload = {
  title: string
  message: string
  roleIds?: number[]
  profileIds?: number[]
}

export const sendNotification = async (
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

export const useSendNotificationMutation = () => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['send-notification'],
    mutationFn: (data: NotificationPayload) =>
      sendNotification(data, token as string),
  })
}
