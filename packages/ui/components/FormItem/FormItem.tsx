import { forwardRef, Ref } from 'react'

import { Input } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FieldValues } from 'react-hook-form'

import { Field, InputGroup, PasswordInput } from '@fc/chakra'
import { useMergeRefs } from '@fc/ui/hooks/useMergeRefs'

import { FormItemProps } from './types'
import { I18nNamespaces } from '../../@types/i18next'

function FormItemBase<TFieldValues extends FieldValues = FieldValues>(
  {
    name,
    type,
    as,
    leftElement,
    rightElement,
    label: initialLabel,
    helperText,
    errors,
    register,
    required,
    hideLabel,
    tooltip,
    placeholder: initialPlaceholder,
    ...rest
  }: FormItemProps<TFieldValues>,
  formItemRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  const { t } = useTranslation()

  const Tag = type === 'password' ? PasswordInput : as || Input
  const errorMessage = errors?.[name]?.['message'] as unknown as string

  const { ref: registerRef, ...registerRest } = register(name)
  const ref = useMergeRefs(formItemRef, registerRef)

  const translatedName = t(name as keyof I18nNamespaces['common'])
  const label = initialLabel || translatedName
  const placeholder = initialPlaceholder || translatedName

  return (
    <Field
      name={name}
      errorText={errorMessage}
      helperText={helperText}
      label={hideLabel ? null : label}
      tooltip={tooltip}
      invalid={Boolean(errors?.[name])}
      required={required}
    >
      <InputGroup
        w={'full'}
        startElement={leftElement}
        endElement={rightElement}
      >
        <Tag
          data-testid={`input-${name}`}
          ref={ref}
          id={name}
          type={type}
          placeholder={placeholder}
          _placeholder={{ color: 'gray.300' }}
          w={'full'}
          {...registerRest}
          {...rest}
        />
      </InputGroup>
    </Field>
  )
}

export const FormItem = forwardRef(FormItemBase) as <
  TFieldValues extends FieldValues = FieldValues,
>(
  props: FormItemProps<TFieldValues> & {
    ref?: Ref<HTMLInputElement | HTMLTextAreaElement>
  },
) => JSX.Element
