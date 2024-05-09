import { useTranslation } from 'next-i18next'

import { ModelStaticSelectProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'
import { WSelect } from '../../components'

export const ModelStaticSelect = ({
  options,
  ...rest
}: ModelStaticSelectProps) => {
  const { t } = useTranslation()

  const mappedStaticOptions = options?.map(option => ({
    value: option,
    label: t(option as unknown as keyof I18nNamespaces['common']),
  }))

  return <WSelect options={mappedStaticOptions} {...rest} />
}
