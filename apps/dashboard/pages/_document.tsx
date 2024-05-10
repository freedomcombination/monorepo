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
          {/* manifest file had to be renamed for PWA to work on mobile */}
          {/* <link rel="manifest" href="/site.webmanifest" /> */}
          <link rel="manifest" href="/manifest.json" />
          {/* For app's title to show properly */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" content="#ffffff" />
          {/* Optional tags to be tested in case */}
          {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
          {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
          {/* <meta name="apple-mobile-web-app-status-bar-style" content="default" /> */}
          {/* <meta name="mobile-web-app-capable" content="yes" /> */}
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
