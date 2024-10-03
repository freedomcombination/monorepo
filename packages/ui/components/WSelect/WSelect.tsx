import { createListCollection } from '@chakra-ui/react'
import { upperFirst } from 'lodash'
import { useTranslation } from 'next-i18next'
import { FieldValues, useController } from 'react-hook-form'

import {
  Field,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@fc/chakra'

import { SelectOption, WSelectProps } from './types'
import { I18nNamespaces } from '../../@types/i18next'

export const WSelect = <T extends FieldValues = FieldValues>({
  control,
  name,
  label: initialLabel,
  errors,
  required,
  helperText,
  placeholder: initialPlaceholder,
  options,
  tooltip,
  ...rest
}: WSelectProps<T>) => {
  const { field } = useController<T>({
    name,
    control,
  })

  const { t } = useTranslation()

  const translatedName = t(name as keyof I18nNamespaces['common'])
  const label = initialLabel || translatedName
  const placeholder = initialPlaceholder || translatedName

  const errorMessage =
    errors?.[name]?.['message'] &&
    upperFirst(errors?.[name]?.['message'] as string)

  const collection = createListCollection({
    items: options,
  })

  return (
    <Field
      name={name}
      invalid={Boolean(errors?.[name])}
      required={required}
      w="full"
      pos="relative"
      helperText={helperText}
      errorText={errorMessage}
      tooltip={tooltip}
    >
      <SelectRoot
        {...field}
        onValueChange={e => field.onChange(e.value)}
        {...rest}
        collection={collection}
      >
        <SelectLabel>{label}</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: SelectOption) => (
            <SelectItem key={option.value} item={option}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Field>
  )
}
