import { forwardRef, Ref } from 'react'

import { useBoolean, useMergeRefs } from '@chakra-ui/hooks'
import { Box, Flex, Group, Input, InputElement } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FieldValues } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { TbInfoCircle } from 'react-icons/tb'

import { Field, IconButton, Tooltip } from '@fc/chakra'

import { FormItemProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

export const FormItem = forwardRef(function FormItem<
  TFieldValues extends FieldValues = FieldValues,
>(
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
      {label && !hideLabel && (
        <Flex align={'center'} mb={1}>
          {tooltip && (
            <Tooltip positioning={{ placement: 'top-start' }} content={tooltip}>
              <Box color="gray.500">
                <TbInfoCircle />
              </Box>
            </Tooltip>
          )}
        </Flex>
      )}
      <Group>
        {leftElement && (
          <InputElement pointerEvents="none" h={'full'}>
            <Box color="gray.300">{leftElement}</Box>
          </InputElement>
        )}
        <Tag
          ref={ref}
          id={name}
          type={type === 'password' ? (isOpen ? 'text' : 'password') : type}
          placeholder={placeholder}
          _placeholder={{ color: 'gray.300' }}
          {...registerRest}
          {...rest}
        />

        {type !== 'password' && rightElement && (
          <InputElement h={'full'}>
            <Box color="gray.300">{rightElement}</Box>
          </InputElement>
        )}
        {type === 'password' && (
          <InputElement h={'full'}>
            <IconButton
              variant="plain"
              color={'inherit'}
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={setIsOpen.toggle}
            />
          </InputElement>
        )}
      </Group>
    </Field>
  )
})
