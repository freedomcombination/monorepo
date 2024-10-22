import { createListCollection } from '@chakra-ui/react'

import type { StrapiModel } from '@fc/types'

import { ModelDynamicSelect } from './ModelDynamicSelect'
import { ModelStaticSelect } from './ModelStaticSelect'
import {
  ModelDynamicSelectProps,
  ModelSelectProps,
  ModelStaticSelectProps,
} from './types'

export const ModelSelect = <T extends StrapiModel>(props: ModelSelectProps) => {
  const dynamicProps = props as ModelDynamicSelectProps
  const staticProps = props as ModelStaticSelectProps

  const collection = createListCollection({
    items: staticProps.options || [],
  })

  if (dynamicProps.endpoint) {
    return <ModelDynamicSelect<T> {...dynamicProps} collection={collection} />
  }

  return <ModelStaticSelect {...staticProps} collection={collection} />
}
