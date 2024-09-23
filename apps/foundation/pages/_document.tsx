import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

import { DocumentContent } from '@fc/ui/components/DocumentContent'

export default class Document extends NextDocument {
  render() {
    return (
      <Html suppressHydrationWarning>
        <Head>
          <DocumentContent />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
