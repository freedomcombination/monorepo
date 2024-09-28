import { ComponentProps } from 'react'

import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { Field, Select } from '@fc/chakra'
import { useCitiesOfCountry } from '@fc/services/city'
import { useAllCountries } from '@fc/services/country'

import { useJoinFormContext } from './useJoinFormContext'

export const LocationForm = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useJoinFormContext()
  const { t } = useTranslation()

  const selectedCountry = watch('country')

  const countriesQuery = useAllCountries()
  const citiesQuery = useCitiesOfCountry(selectedCountry)

  const countries = countriesQuery.data || []
  const cities = citiesQuery.data || []

  const handleCountryChange: ComponentProps<typeof Select>['onChange'] = e => {
    if (e) {
      setValue('country', e.target?.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  const handleCityChange: ComponentProps<typeof Select>['onChange'] = e => {
    if (selectedCountry && e.target?.value) {
      setValue('city', e.target?.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
      <Field
        invalid={countriesQuery.isError}
        label={t('country')}
        errorText={
          (countriesQuery.error && 'An error occured') ||
          errors.country?.message
        }
      >
        <Select
          placeholder={t('select-country')}
          onChange={handleCountryChange}
        >
          {countries.map(country => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        invalid={citiesQuery.isError}
        label={t('city')}
        errorText={
          (citiesQuery.error && 'An error occured') || errors.city?.message
        }
      >
        <Select
          disabled={!selectedCountry}
          placeholder={t('select-city')}
          onChange={handleCityChange}
        >
          {cities.map(city => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </Select>
      </Field>
    </Stack>
  )
}
