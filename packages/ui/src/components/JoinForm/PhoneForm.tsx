import { useState } from 'react'

import {
  Image as ChakraImage,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react'
import Select from 'react-select'

import { useAllCountries } from '@fc/services'

import { useJoinFormContext } from './useJoinFormContext'

type PhoneOption = {
  value: string
  flag: string
  label: string
  code: string
  areaCode: string
}

const CustomSingleValue = ({ data }: { data: PhoneOption }) => (
  <Flex alignItems="center">
    <ChakraImage
      src={data.flag}
      alt={data.label}
      height="20px"
      width="30px"
      style={{ marginRight: '8px' }}
    />
    <Text>{data.value}</Text>
  </Flex>
)

const CustomOption = (props: any) => {
  const { data, innerRef, innerProps } = props

  return (
    <div ref={innerRef} {...innerProps}>
      <Flex alignItems="center">
        <ChakraImage
          src={data.flag}
          alt={data.label}
          height="20px"
          width="30px"
          style={{ marginRight: '8px' }}
        />
        <Text>{data.label}</Text>
      </Flex>
    </div>
  )
}

// TODO: Use https://www.npmjs.com/package/react-phone-number-input and https://www.npmjs.com/package/yup-phone
export const PhoneForm = () => {
  const {
    setValue,
    formState: { errors },
  } = useJoinFormContext()
  const [selectedCountry, setSelectedCountry] = useState<PhoneOption | null>(
    null,
  )
  const [phoneNumber, setPhoneNumber] = useState('')

  const countriesQuery = useAllCountries()

  const countries = countriesQuery.data || []

  const handleCountryChange = (option: PhoneOption | null) => {
    setSelectedCountry(option)
    setPhoneNumber('')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const digits = input.replace(/\D/g, '')
    const maxLength = 9

    if (digits.length <= maxLength) {
      setPhoneNumber(input)

      const fullPhoneNumber = selectedCountry
        ? selectedCountry.areaCode + digits
        : digits

      setValue('phone', fullPhoneNumber)
    }
  }

  if (countriesQuery.isLoading) {
    return <Spinner size="xl" />
  }

  return (
    <FormControl isInvalid={!!errors.phone?.message}>
      <FormLabel fontWeight={600} fontSize={'sm'} htmlFor="phone">
        Phone Number
      </FormLabel>
      <Flex gap={4}>
        <Select
          value={selectedCountry}
          options={countries}
          onChange={handleCountryChange}
          components={{ SingleValue: CustomSingleValue, Option: CustomOption }}
          isSearchable
          styles={{
            control: base => ({
              ...base,
              minWidth: '180px',
              maxWidth: '300px',
            }),
          }}
        />
        <Input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          pl={4}
          maxLength={9}
          minWidth={200}
        />
      </Flex>
      <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
    </FormControl>
  )
}
