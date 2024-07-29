import * as Sentry from '@sentry/nextjs'
import { NextPage } from 'next'
import Error, { ErrorProps } from 'next/error'

import { Layout } from '../components'

const CustomErrorComponent: NextPage<ErrorProps> = props => {
  return (
    <Layout seo={{ title: 'Error' }}>
      <Error withDarkMode={false} statusCode={props.statusCode} />
    </Layout>
  )
}

CustomErrorComponent.getInitialProps = async contextData => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return Error.getInitialProps(contextData)
}

export default CustomErrorComponent
