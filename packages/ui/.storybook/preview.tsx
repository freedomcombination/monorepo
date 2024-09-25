// eslint-disable @nx/enforce-module-boundaries
import React, { Suspense, useEffect } from 'react'

import { Decorator } from '@storybook/react'
import { GlobalTypes, Parameters } from '@storybook/types'
import type { StrapiLocale } from '@fc/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { I18nextProvider } from 'react-i18next'
import { themes } from '@fc/config/theme'

import i18n from './i18next'

export const parameters: Parameters = {
  i18n,
  chakra: {
    theme: themes.dashboard,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
}

// Create a global variable called locale in storybook
// and add a menu in the toolbar to change your locale
export const globalTypes: GlobalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'nl', title: 'Nederlands' },
        { value: 'tr', title: 'Türkçe' },
      ],
      showName: true,
    },
  },
}

const queryClient = new QueryClient()

/**
 * adds a Storybook decorator to get the cache and dev tools showing for each story
 */
export const decorators: Decorator[] = [
  (Story, context) => {
    const locale = context.globals?.locale as StrapiLocale

    useEffect(() => {
      i18n.changeLanguage(locale)
    }, [locale])

    return (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading</div>}>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </Suspense>
      </QueryClientProvider>
    )
  },
]
