import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple_touch_icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon_32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="theme-color" content="#ffffff" />
          {(process.env.NODE_ENV === 'development' ||
            process.env.VERCEL_ENV === 'preview') && (
            // eslint-disable-next-line @next/next/no-sync-scripts
            <script
              data-project-id="qOgGKhQfKQkreAvMYBda0CWkoPB9z7d4mqJqSYPD"
              src="https://snippet.meticulous.ai/v1/meticulous.js"
            />
          )}
        </Head>
        <body>
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
