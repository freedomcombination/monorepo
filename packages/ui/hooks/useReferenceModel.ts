import { useMemo } from 'react'

import type { StrapiTranslatableModel } from '@fc/types'

export const getReferenceModel = <T extends StrapiTranslatableModel>(
  model?: T | null,
) => {
  if (!model) return null

  const original = (model.localizations as T[])?.reduce((acc, cur) => {
    if (cur.id < acc.id) return cur
    else return acc
  }, model)

  return original
}

export const useReferenceModel = <T extends StrapiTranslatableModel>(
  model?: T | null,
) => {
  const originalModel = useMemo(() => getReferenceModel(model), [model])

  return originalModel
}
