import React from 'react'

export const DocumentContent = () => {
  return (
    <>
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
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* For app's title to show properly */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      {/* Optional tags to be tested in case */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      {(process.env.NODE_ENV === 'development' ||
        process.env.NEXT_PUBLIC_ENVIRONMENT === 'preview') &&
        process.env.METICULOUS_PROJECT_ID && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-project-id={process.env.METICULOUS_PROJECT_ID}
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
        )}
    </>
  )
}
