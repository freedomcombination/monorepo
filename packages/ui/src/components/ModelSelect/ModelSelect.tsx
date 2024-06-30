import { StrapiModel } from '@fc/types'

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

  if (dynamicProps.endpoint) {
    return <ModelDynamicSelect<T> {...dynamicProps} />
  }

  return <ModelStaticSelect {...staticProps} />
}
