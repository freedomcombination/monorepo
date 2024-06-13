import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { DocumentContent } from '@fc/ui'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <DocumentContent />
          <link rel="stylesheet" href="https://use.typekit.net/fnm3rna.css" />
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
