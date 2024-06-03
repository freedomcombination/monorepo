import * as yup from 'yup'

import { Notification } from '@fc/types'

import { FormFields } from '../../admin'

export const useNotificationsSchema = () => {
  return yup.object({
    title: yup.string().required(),
    body: yup.string().required(),
  })
}

export const notificationFields: FormFields<Notification> = [
  { name: 'title', isRequired: true },
  { name: 'body', isRequired: true },
]
