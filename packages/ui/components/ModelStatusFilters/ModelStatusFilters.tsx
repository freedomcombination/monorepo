import { FC } from 'react'

import { MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { I18nNamespaces } from '../../@types/i18next'
import { Option } from '../ModelSelect'

type ModelStatusFiltersProps = {
  args: {
    title: keyof I18nNamespaces['common'] | string
    currentValue: string
    defaultValue: string
    hidden?: boolean
    setCurrentValue: (value: string) => void
    statuses?: string[] | Option[]
  }[]
}

export const ModelStatusFilters: FC<ModelStatusFiltersProps> = ({ args }) => {
  const { t } = useTranslation()

  return (
    <>
      {args
        ?.filter(arg => !arg.hidden)
        .map((arg, i) => {
          const {
            currentValue,
            defaultValue,
            setCurrentValue,
            statuses,
            title,
          } = arg

          const handleChange = (value: string | string[]) => {
            setCurrentValue(value as string)
          }

          return (
            <MenuOptionGroup
              key={i}
              value={currentValue || defaultValue}
              onChange={handleChange}
              title={t(title as keyof I18nNamespaces['common'])}
            >
              {statuses?.map((status, i) => {
                const value = typeof status === 'string' ? status : status.value
                const label = typeof status === 'string' ? status : status.label

                return (
                  <MenuItemOption key={i} value={`${value}`}>
                    {t(label as keyof I18nNamespaces['common'])}
                  </MenuItemOption>
                )
              })}
            </MenuOptionGroup>
          )
        })}
    </>
  )
}
