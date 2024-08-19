import { GroupBase, Select } from 'chakra-react-select'
import { useTranslation } from 'next-i18next'
import { FieldValues, useController } from 'react-hook-form'

import { Field } from '@fc/chakra'

import { SelectOption, WSelectProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

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

  const errorMessage = errors?.[name]?.['message'] as unknown as string

  return (
    <Field
      invalid={Boolean(errors?.[name])}
      required={required}
      w="full"
      pos="relative"
      helperText={helperText}
      errorText={errorMessage}
      label={label}
      tooltip={tooltip}
    >
      <Select<SelectOption, boolean, GroupBase<SelectOption>>
        options={options}
        placeholder={placeholder}
        {...field}
        onChange={val => field.onChange(val as any)}
        {...rest}
      />
    </Field>
  )
}
