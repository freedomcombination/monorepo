import { useTranslation } from 'next-i18next'
import { Control, FieldValues, useController } from 'react-hook-form'

import { I18nNamespaces } from '../../../@types/i18next'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '../Form'
import { FormItemProps } from '../FormItem'
import { FormUploader } from '../FormUploader/FormUploader'
import { MarkdownEditor } from '../MarkdownEditor'

type MdFormItemProps<T extends FieldValues> = {
  control: Control<T>
} & Omit<FormItemProps<T>, 'register' | 'leftElement'>

export const MdFormItem = <T extends FieldValues>({
  control,
  name,
  label: initialLabel,
  hideLabel,
  errors,
  required,
  helperText,
  disabled,
  placeholder: initialPlaceholder,
  ...rest
}: MdFormItemProps<T>) => {
  const {
    field: { onChange, value, ...fieldProps },
  } = useController<T>({
    name,
    control,
  })

  const { t } = useTranslation()

  const translatedName = t(name as keyof I18nNamespaces['common'])
  const label = initialLabel || translatedName
  const placeholder = initialPlaceholder || translatedName

  const errorMessage = errors?.[name]?.['message'] as unknown as string

  return (
    <FormControl
      invalid={Boolean(errors?.[name])}
      required={required}
      w="full"
      pos="relative"
      flex={1}
      display={'flex'}
      flexDir={'column'}
    >
      {label && !hideLabel && (
        <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight={600}>
          {label}
        </FormLabel>
      )}

      {!disabled && <FormUploader />}

      <MarkdownEditor
        placeholder={placeholder}
        onChange={(value: { text: string; html: string }) =>
          onChange(value.text)
        }
        value={value}
        disabled={disabled}
        {...fieldProps}
        {...rest}
      />

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
      {helperText && (
        <FormHelperText color="orange.400">{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
