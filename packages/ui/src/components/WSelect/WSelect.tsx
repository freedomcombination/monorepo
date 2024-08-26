import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Tooltip,
} from '@chakra-ui/react'
import { GroupBase, Select } from 'chakra-react-select'
import { useTranslation } from 'next-i18next'
import { FieldValues, useController } from 'react-hook-form'
import { TbInfoCircle } from 'react-icons/tb'

import { SelectOption, WSelectProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

export const WSelect = <T extends FieldValues = FieldValues>({
  control,
  name,
  label: initialLabel,
  hideLabel,
  errors,
  isRequired,
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
    <FormControl
      isInvalid={Boolean(errors?.[name])}
      isRequired={isRequired}
      w="full"
      pos="relative"
    >
      {label && !hideLabel && (
        <Flex align={'center'} mb={1}>
          <FormLabel
            mb={0}
            htmlFor={name}
            fontSize="sm"
            fontWeight={600}
            textTransform={'capitalize'}
          >
            {label}
          </FormLabel>
          {tooltip && (
            <Tooltip
              placement="top-start"
              bg={'white'}
              fontSize={'xs'}
              color={'black'}
              label={tooltip}
              aria-label={tooltip}
              cursor={'pointer'}
            >
              <Box color="gray.500">
                <TbInfoCircle />
              </Box>
            </Tooltip>
          )}
        </Flex>
      )}

      <Select<SelectOption, boolean, GroupBase<SelectOption>>
        id={`${name}-select`}
        options={options}
        placeholder={placeholder}
        {...field}
        onChange={val => field.onChange(val as any)}
        {...rest}
      />

      <FormErrorMessage data-testid={`error-text-${name}`}>
        {errorMessage}
      </FormErrorMessage>
      {helperText && (
        <FormHelperText color={'orange.400'}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
