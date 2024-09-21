import { FC, useEffect, useState } from 'react'

import { FormLabel, VStack, Stack, Text } from '@chakra-ui/react'
import { UseFormSetValue } from 'react-hook-form'
import Select from 'react-select'

import { getAllCountryNames, getCitiesOfCountry } from '@fc/utils'

import { JoinFormFieldValues } from './types'

type Option = {
  value: string
  label: string
}

type LocationFormProps = {
  setValue: UseFormSetValue<JoinFormFieldValues>
}

export const LocationForm: FC<LocationFormProps> = ({ setValue }) => {
  const [countries, setCountries] = useState<Option[]>([])
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
  const [cities, setCities] = useState<Option[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getCountries = async () => {
    try {
      const countries = await getAllCountryNames()

      if (countries) {
        setCountries(countries)
      }
    } catch (error) {
      setErrorMessage(`Failed to fetch countries data: ${error}`)
    }
  }
  useEffect(() => {
    getCountries()
  }, [])

  const getCities = async (selectedCountry: Option) => {
    try {
      const cities = await getCitiesOfCountry(selectedCountry?.value)
      if (cities) {
        setCities(cities)
      }
    } catch (error) {
      setErrorMessage(`Failed to fetch cities data: ${error}`)
    }
  }
  useEffect(() => {
    if (selectedCountry) {
      getCities(selectedCountry)
    }
  }, [selectedCountry])

  const handleCitiesChange = (option: Option) => {
    if (selectedCountry) {
      setValue('address', {
        country: selectedCountry?.value,
        city: option?.value,
      })
    }
  }
  setTimeout(() => {
    setErrorMessage('')
  }, 3000)

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
      {errorMessage && <Text color="red">{errorMessage}</Text>}
      <VStack alignItems="start">
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
      </VStack>

      {selectedCountry && (
        <VStack alignItems="start">
          <FormLabel
            mb={0}
            fontSize="sm"
            fontWeight={600}
            textTransform={'capitalize'}
          >
            City
          </FormLabel>
          <Select
            placeholder="Select city"
            options={cities}
            onChange={option => handleCitiesChange(option as Option)}
          />
        </VStack>
      )}
    </Stack>
  )
}
