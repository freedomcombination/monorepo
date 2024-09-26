import { useState } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Select from 'react-select'

import { useCitiesOfCountry } from '@fc/services/city'
import { useAllCountries } from '@fc/services/country'

import { Option } from './types'
import { useJoinFormContext } from './useJoinFormContext'

export const LocationForm = () => {
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
  const { setValue } = useJoinFormContext()
  const { t } = useTranslation()

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
          {t('country')}
        </FormLabel>
        <Select
          placeholder={t('select-country')}
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
          {t('city')}
        </FormLabel>
        <Select
          isDisabled={!selectedCountry}
          placeholder={t('select-city')}
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
