import { ComponentProps } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useTranslation } from 'next-i18next'

import { useCitiesOfCountry } from '@fc/services/city'
import { useAllCountries } from '@fc/services/country'

import { Option } from './types'
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

  const handleCountryChange: ComponentProps<
    typeof Select<Option>
  >['onChange'] = option => {
    if (option) {
      setValue('country', option?.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  const handleCityChange: ComponentProps<
    typeof Select<Option>
  >['onChange'] = option => {
    if (selectedCountry && option) {
      setValue('city', option?.value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }

  return (
    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
      <FormControl
        isInvalid={countriesQuery.isError || !!errors?.country?.message}
        isRequired
      >
        <FormLabel
          mb={2}
          fontSize="sm"
          fontWeight={600}
          textTransform={'capitalize'}
        >
          {t('country')}
        </FormLabel>
        <Select
          placeholder={t('select-country')}
          options={countries}
          onChange={handleCountryChange}
        />
        <FormErrorMessage>
          {errors?.country?.message ||
            (countriesQuery.error && 'An error occured')}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={citiesQuery.isError || !!errors?.city?.message}
        isRequired
      >
        <FormLabel
          mb={2}
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
          onChange={handleCityChange}
        />
        <FormErrorMessage>
          {errors?.city?.message || (citiesQuery.error && 'An error occured')}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  )
}
