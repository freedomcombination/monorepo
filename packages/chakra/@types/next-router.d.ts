import { DehydratedState } from '@tanstack/react-query'
import { NextRouter } from 'next/router'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import { Localize, StrapiLocale } from '@fc/types'

export interface RouterComponent {
  locale: StrapiLocale
  slugs: Localize<string>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  dehydratedState: DehydratedState
  pageData: Record<string, unknown>
  _nextI18Next: any
  seo: NextSeoProps
  link: string
}

declare module 'next/router' {
  export type Locale = StrapiLocale
  export function useRouter(): Omit<NextRouter, 'locale' | 'locales'> & {
    locale: Locale
    locales: Locale[]
    components: Record<string, { props: { pageProps: RouterComponent } }>
  }
}
