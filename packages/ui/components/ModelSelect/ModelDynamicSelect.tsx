import { useState } from 'react'

import { useRouter } from 'next/router'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import { endpointsWithApprovalStatus } from '@fc/services/common/urls'
import type { StrapiCollectionEndpoint, StrapiModel } from '@fc/types'
import { mapModelsToOptions } from '@fc/utils/mapModelsToOptions'

import { ModelDynamicSelectProps } from './types'
import { WSelect } from '../WSelect'

export const ModelDynamicSelect = <T extends StrapiModel>({
  endpoint,
  populate,
  ...rest
}: ModelDynamicSelectProps) => {
  const { locale } = useRouter()
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  const modelsQuery = useStrapiRequest<T>({
    endpoint: endpoint as StrapiCollectionEndpoint,
    locale,
    ...(endpointsWithApprovalStatus.includes(
      endpoint as StrapiCollectionEndpoint,
    ) && {
      filters: {
        approvalStatus: { $eq: 'approved' },
      } as any,
    }),
    pageSize: 100,
    populate,
    queryOptions: {
      enabled: isMenuOpened,
    },
  })

  const models = modelsQuery.data?.data?.map((model: any) => ({
    name_en: model.title_en || model.name_en,
    name_tr: model.title_tr || model.name_tr,
    name_nl: model.title_nl || model.name_nl,
    ...model,
  }))

  const options = models && mapModelsToOptions(models, locale)

  return (
    <WSelect
      onMenuOpen={() => setIsMenuOpened(true)}
      {...rest}
      options={options}
    />
  )
}
