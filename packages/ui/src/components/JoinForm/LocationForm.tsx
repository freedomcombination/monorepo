import { FC, useState } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import Select from 'react-select'

import { useAllCountries, useCitiesOfCountry } from '@fc/services'

import { JoinFormFieldValues, Option } from './types'

type LocationFormProps = {
  setValue: UseFormSetValue<JoinFormFieldValues>
}

export const LocationForm: FC<LocationFormProps> = ({ setValue }) => {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)

  const countriesQuery = useAllCountries()
  const citiesQuery = useCitiesOfCountry(selectedCountry?.value)

  const countries = countriesQuery.data || []
  const cities = citiesQuery.data || []

  const handleCitiesChange = (option: Option) => {
    if (selectedCountry) {
      setValue('address', {
        country: selectedCountry?.value,
        city: option?.value,
      })
    }
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
      <FormControl isInvalid={countriesQuery.isError}>
        <FormLabel
          mb={0}
          fontSize="sm"
          fontWeight={600}
          textTransform={'capitalize'}
        >
          Country
        </FormLabel>
        <Select
          placeholder="Select country"
          options={countries}
          onChange={option => setSelectedCountry(option as Option)}
        />
        <FormErrorMessage>
          {countriesQuery.error && 'An error occured'}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={citiesQuery.isError}>
        <FormLabel
          mb={0}
          fontSize="sm"
          fontWeight={600}
          textTransform={'capitalize'}
        >
          City
        </FormLabel>
        <Select
          isDisabled={!selectedCountry}
          placeholder="Select city"
          options={cities}
          onChange={option => handleCitiesChange(option as Option)}
        />
        <FormErrorMessage>
          {citiesQuery.error && 'An error occured'}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  )
}
