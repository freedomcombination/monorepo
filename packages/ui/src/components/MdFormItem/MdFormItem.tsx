import { forwardRef, Ref } from 'react'

import { useMergeRefs } from '@chakra-ui/hooks'
import { useTranslation } from 'next-i18next'
import { Control, FieldValues, useController } from 'react-hook-form'

import { Field } from '@fc/chakra'

import { I18nNamespaces } from '../../../@types/i18next'
import { FormItemProps } from '../FormItem'
import { FormUploader } from '../FormUploader/FormUploader'
import { MarkdownEditor } from '../MarkdownEditor'

type MdFormItemProps<T extends FieldValues> = {
  control: Control<T>
} & Omit<FormItemProps<T>, 'register' | 'leftElement'>

export const MdFormItem = forwardRef(function MdFormItem<T extends FieldValues>(
  {
    control,
    name,
    label: initialLabel,
    errors,
    required,
    helperText,
    disabled,
    placeholder: initialPlaceholder,
    ...rest
  }: MdFormItemProps<T>,
  markdownRef: Ref<HTMLTextAreaElement>,
) {
  const {
    field: { onChange, value, ref: fieldRef, ...fieldProps },
  } = useController<T>({
    name,
    control,
  })

  const { t } = useTranslation()
  const ref = useMergeRefs(markdownRef, fieldRef)

  const translatedName = t(name as keyof I18nNamespaces['common'])
  const label = initialLabel || translatedName
  const placeholder = initialPlaceholder || translatedName

  const errorMessage = errors?.[name]?.['message'] as unknown as string

  return (
    <Field
      name={name}
      invalid={Boolean(errors?.[name])}
      required={required}
      w="full"
      pos="relative"
      flex={1}
      display={'flex'}
      flexDir={'column'}
      label={label}
      errorText={errorMessage}
      helperText={helperText}
    >
      {!disabled && <FormUploader />}

      <MarkdownEditor
        ref={ref}
        placeholder={placeholder}
        onChange={(value: { text: string; html: string }) =>
          onChange(value.text)
        }
        value={value}
        disabled={disabled}
        {...fieldProps}
        {...rest}
      />
    </Field>
  )
})
