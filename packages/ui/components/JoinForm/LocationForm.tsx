import { useState } from 'react'

import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import Select from 'react-select'

import { Field } from '@fc/chakra'
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
    <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
      <Field
        invalid={countriesQuery.isError}
        label={t('country')}
        errorText={countriesQuery.error && 'An error occured'}
      >
        <Select
          placeholder={t('select-country')}
          options={countries}
          onChange={option => setSelectedCountry(option as Option)}
        />
      </Field>

      <Field
        invalid={citiesQuery.isError}
        label={t('city')}
        errorText={citiesQuery.error && 'An error occured'}
      >
        <Select
          isDisabled={!selectedCountry}
          placeholder={t('select-city')}
          options={cities}
          onChange={option => handleCitiesChange(option as Option)}
        />
      </Field>
    </Stack>
  )
}
