import { ReactElement, ReactNode, RefAttributes } from 'react'

import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Tooltip,
  useBoolean,
  useMergeRefs,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { TbInfoCircle } from 'react-icons/tb'

import { I18nNamespaces } from '../../../@types/i18next'

export type FormItemProps<T extends FieldValues> = InputProps & {
  name: Path<T>
  label?: string
  placeholder?: string
  helperText?: string
  leftElement?: ReactNode
  hideLabel?: boolean
  tooltip?: string
  errors: Partial<FieldErrorsImpl<T>>
  register: UseFormRegister<T>
}

export type FormItemComponent = <FormValues extends FieldValues>(
  props: FormItemProps<FormValues> &
    RefAttributes<HTMLInputElement | HTMLTextAreaElement>,
) => ReactElement

export const FormItem: FormItemComponent = forwardRef(
  (
    {
      name,
      type,
      as,
      leftElement,
      label: initialLabel,
      helperText,
      errors,
      register,
      isRequired,
      hideLabel,
      tooltip,
      placeholder: initialPlaceholder,
      ...rest
    },
    formItemRef,
  ) => {
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
      <FormControl isInvalid={Boolean(errors?.[name])} isRequired={isRequired}>
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
        <InputGroup>
          {leftElement && (
            <InputLeftElement pointerEvents="none">
              <Box color="gray.300">{leftElement}</Box>
            </InputLeftElement>
          )}
          {type === 'password' && (
            <InputRightElement>
              <IconButton
                variant="link"
                color={'inherit'}
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={setIsOpen.toggle}
              />
            </InputRightElement>
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
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        {helperText && (
          <FormHelperText color={'orange.400'}>{helperText}</FormHelperText>
        )}
      </FormControl>
    )
  },
)
