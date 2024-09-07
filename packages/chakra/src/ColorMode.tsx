'use client'

import { ClientOnly, Skeleton } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'
import { LuMoon, LuSun } from 'react-icons/lu'

import { IconButton, IconButtonProps } from './IconButton'

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }

  return {
    colorMode: resolvedTheme,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()

  return colorMode === 'light' ? light : dark
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()

  return colorMode === 'light' ? <LuSun /> : <LuMoon />
}

export function ColorModeButton(props: IconButtonProps) {
  const { toggleColorMode } = useColorMode()

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        size="sm"
        {...props}
        css={{
          _icon: {
            width: '5',
            height: '5',
          },
        }}
        icon={<ColorModeIcon />}
      />
    </ClientOnly>
  )
}
