import { forwardRef } from 'react'

import { useBoolean, useMergeRefs } from '@chakra-ui/hooks'
import { Box, Flex } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FieldValues } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { TbInfoCircle } from 'react-icons/tb'

import { FormItemProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '../Form'
import { IconButton } from '../IconButton'
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '../Input'
import { Tooltip } from '../Tooltip'

// TODO: Make it generic
export const FormItem = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormItemProps<FieldValues>
>(
  (
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
    },
    formItemRef,
  ) => {
    const [isOpen, setIsOpen] = useBoolean(false)

    const { t } = useTranslation()

    const Component = as || Input
    const errorMessage = errors?.[name]?.['message'] as unknown as string

    const { ref: registerRef, ...registerRest } = register(name)
    const ref = useMergeRefs(formItemRef, registerRef)

    const translatedName = t(name as keyof I18nNamespaces['common'])
    const label = initialLabel || translatedName
    const placeholder = initialPlaceholder || translatedName

    return (
      <FormControl invalid={Boolean(errors?.[name])} required={required}>
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
              <Tooltip hasArrow label={tooltip} aria-label={tooltip}>
                <Box
                  cursor={'pointer'}
                  bg={'white'}
                  fontSize={'xs'}
                  color={'black'}
                >
                  <TbInfoCircle />
                </Box>
              </Tooltip>
            )}
          </Flex>
        )}
        <InputGroup>
          <Component
            ref={ref}
            id={name}
            type={type === 'password' ? (isOpen ? 'text' : 'password') : type}
            placeholder={placeholder}
            _placeholder={{ color: 'gray.300' }}
            {...registerRest}
            {...rest}
          />
          {leftElement && (
            <InputLeftElement pointerEvents="none" h={'full'}>
              <Box color="gray.300">{leftElement}</Box>
            </InputLeftElement>
          )}
          {type !== 'password' && rightElement && (
            <InputRightElement h={'full'}>
              <Box color="gray.300">{rightElement}</Box>
            </InputRightElement>
          )}
          {type === 'password' && (
            <InputRightElement h={'full'}>
              <IconButton
                variant="ghost"
                color={'inherit'}
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={setIsOpen.toggle}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        {helperText && (
          <FormHelperText color={'orange.400'}>{helperText}</FormHelperText>
        )}
      </FormControl>
    )
  },
)

FormItem.displayName = 'FormItem'
