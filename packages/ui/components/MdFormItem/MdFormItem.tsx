import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import { upperFirst } from 'lodash'
import { useTranslation } from 'next-i18next'
import { Control, FieldValues, useController } from 'react-hook-form'

import { I18nNamespaces } from '../../@types/i18next'
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
  isRequired,
  helperText,
  isDisabled,
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
      isInvalid={Boolean(errors?.[name])}
      isRequired={isRequired}
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

      {!isDisabled && <FormUploader />}

      <MarkdownEditor
        placeholder={placeholder}
        onChange={(value: { text: string; html: string }) =>
          onChange(value.text)
        }
        value={value}
        isDisabled={isDisabled}
        {...fieldProps}
        {...rest}
      />

      <FormErrorMessage data-testid={`error-text-${name}`}>
        {errorMessage && upperFirst(errorMessage)}
      </FormErrorMessage>
      {helperText && (
        <FormHelperText color="orange.400">{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
