import * as yup from 'yup'

import type { AssetsTracking, FormFields } from '@fc/types'

import { yupSelect } from './common'

export const useAssetsTrackingSchema = () => {
  return yup.object({
    fromLocation: yup.string().required(),
    toLocation: yup.string().required(),
    date: yup.date().required(),
    notes: yup.string(),
    asset: yupSelect.required(),
    assignedTo: yupSelect.required(),
    previousTracking: yupSelect,
  })
}

export const assetsTrackingFields: FormFields<AssetsTracking> = [
  { name: 'fromLocation', required: true },
  { name: 'toLocation', required: true },
  {
    name: 'date',
    required: true,
    type: 'date',
  },
  {
    name: 'asset',
    required: true,
    type: 'select',
    endpoint: 'assets',
  },
  {
    name: 'previousTracking',
    type: 'select',
    endpoint: 'assets-trackings',
    populate: 'asset',
  },
  {
    name: 'assignedTo',
    required: true,
    type: 'select',
    endpoint: 'profiles',
  },
  { name: 'notes', type: 'markdown' },
]
