import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@chakra-ui/storybook-addon'],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.fallback = {
        fs: require.resolve('browserify-fs'),
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
      }

      config.resolve.alias = {
        ...config.resolve.alias,
        '@fc/config': path.resolve(__dirname, '../../config'),
        '@fc/context': path.resolve(__dirname, '../../context'),
        '@fc/mocks': path.resolve(__dirname, '../../mocks'),
        '@fc/secrets': path.resolve(__dirname, '../../secrets'),
        '@fc/services': path.resolve(__dirname, '../../services'),
        '@fc/types': path.resolve(__dirname, '../../types'),
        '@fc/ui': path.resolve(__dirname, '../../ui'),
        '@fc/utils': path.resolve(__dirname, '../../utils'),
        'next-i18next': 'react-i18next',
      }
    }

    return config
  },
}

export default config
