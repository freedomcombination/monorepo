'use client'

import { FC, PropsWithChildren } from 'react'

import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
  ChakraProvider as Provider,
} from '@chakra-ui/react'

import { Site } from '@fc/types'

type ProviderProps = {
  site: Site
}

const siteColors: Partial<Record<Site | 'gray', any>> = {
  'trend-rights': {
    50: { value: '#FFEDE5' },
    100: { value: '#FFCEB8' },
    200: { value: '#FFAE8A' },
    300: { value: '#FF8E5C' },
    400: { value: '#FF6F2E' },
    500: { value: '#FF4F00' },
    600: { value: '#CC3F00' },
    700: { value: '#992F00' },
    800: { value: '#662000' },
    900: { value: '#331000' },
  },
  gray: {
    50: { value: '#F2F2F2' },
    100: { value: '#DBDBDB' },
    200: { value: '#C4C4C4' },
    300: { value: '#ADADAD' },
    400: { value: '#969696' },
    500: { value: '#808080' },
    600: { value: '#666666' },
    700: { value: '#4D4D4D' },
    800: { value: '#333333' },
    900: { value: '#1A1A1A' },
  },
  kunsthalte: {
    50: { value: '#e9f8f2' },
    100: { value: '#d3f0e6' },
    200: { value: '#a7e1cc' },
    300: { value: '#7ad3b3' },
    400: { value: '#4ec499' },
    500: { value: '#22b580' },
    600: { value: '#1b9166' },
    700: { value: '#146d4d' },
    800: { value: '#0e4833' },
    900: { value: '#07241a' },
  },
  lotus: {
    50: { value: '#f5f0e2' },
    100: { value: '#eae0c2' },
    200: { value: '#dfcfa1' },
    300: { value: '#d3be81' },
    400: { value: '#c8ae60' },
    500: { value: '#bd9d40' },
    600: { value: '#9d8235' },
    700: { value: '#5d4d1f' },
    800: { value: '#3c3214' },
    900: { value: '#1c180a' },
  },
}

export const ChakraProvider: FC<PropsWithChildren<ProviderProps>> = ({
  children,
  site,
}) => {
  const colors = siteColors[site] || siteColors['gray']

  const config = defineConfig(
    mergeConfigs(defaultConfig, {
      theme: {
        tokens: {
          colors: {
            primary: colors,
          },
        },
      },
      globalCss: {
        'html, body, #__next': {
          h: 'full',
        },
      },
    }),
  )

  const system = createSystem(config)

  return <Provider value={system}>{children}</Provider>
}
