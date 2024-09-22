import { useEffect, useState } from 'react'

import {
  Flex,
  Text,
  Spinner,
  Input,
  Image as ChakraImage,
} from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import Select from 'react-select'

import { fetchCountryCodes } from '@fc/utils'

import { JoinFormFieldValues } from './types'

type PhoneFormProps = {
  setValue: UseFormSetValue<JoinFormFieldValues>
}

type PhoneOption = {
  value: string
  flag: string
  label: string
}

export const PhoneForm = ({ setValue }: PhoneFormProps) => {
  const [countries, setCountries] = useState<PhoneOption[]>([])
  const [selectedCountry, setSelectedCountry] = useState<PhoneOption | null>(
    null,
  )
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchCountryCodes()
      setCountries(data)
      if (data.length > 0) {
        const defaultCountry =
          data.find((c: PhoneOption) => c.value === '+31') || null
        setSelectedCountry(defaultCountry)
      }
      setLoading(false)
    }
    loadCountries()
  }, [])

  const handleCountryChange = (option: PhoneOption | null) => {
    setSelectedCountry(option)
    setPhoneNumber('')
  }

  const customSingleValue = ({ data }: { data: PhoneOption }) => (
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

  const customOption = (props: any) => {
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const digits = input.replace(/\D/g, '')
    const maxLength = 9
    if (digits.length <= maxLength) {
      setPhoneNumber(input)
      const fullPhoneNumber = selectedCountry
        ? selectedCountry.value + digits
        : digits
      setValue('phone', fullPhoneNumber)
    }
  }

  if (loading) {
    return <Spinner size="xl" />
  }

  return (
    <Flex direction="row" gap={4}>
      <Select
        value={selectedCountry}
        options={countries}
        onChange={handleCountryChange}
        components={{ SingleValue: customSingleValue, Option: customOption }}
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
  )
}
