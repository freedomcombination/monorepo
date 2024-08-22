import { forwardRef, Ref } from 'react'

import { useBoolean, useMergeRefs } from '@chakra-ui/hooks'
import { Group, Input } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FieldValues } from 'react-hook-form'

import { Field } from '@fc/chakra'

import { FormItemProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

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
  const [isOpen, setIsOpen] = useBoolean(false)

  const { t } = useTranslation()

  const Tag = as || Input
  const errorMessage = errors?.[name]?.['message'] as unknown as string

  const { ref: registerRef, ...registerRest } = register(name)
  const ref = useMergeRefs(formItemRef, registerRef)

  const translatedName = t(name as keyof I18nNamespaces['common'])
  const label = initialLabel || translatedName
  const placeholder = initialPlaceholder || translatedName

  return (
    <Field
      errorText={errorMessage}
      helperText={helperText}
      label={label}
      invalid={Boolean(errors?.[name])}
      required={required}
    >
      <Group w={'full'}>
        {/* {leftElement && (
          <InputElement placement={'start'} h={'full'} color={'gray.300'}>
            <IconButton icon={<EyeOnIcon />} />
          </InputElement>
        )} */}
        <Tag
          data-testid={`${name}-input`}
          ref={ref}
          id={name}
          type={type === 'password' ? (isOpen ? 'text' : 'password') : type}
          placeholder={placeholder}
          _placeholder={{ color: 'gray.300' }}
          w={'full'}
          {...registerRest}
          {...rest}
        />
        {/* {type !== 'password' && rightElement && (
          <InputElement h={'full'} color="gray.300">
            {rightElement}
          </InputElement>
        )} */}
        {/* {type === 'password' && (
          <InputElement h={'full'}>
            <IconButton
              variant="plain"
              color={'inherit'}
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={setIsOpen.toggle}
            />
          </InputElement>
        )} */}
      </Group>
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
