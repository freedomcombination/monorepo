import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { DocumentContent } from '@fc/ui'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <DocumentContent />
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
