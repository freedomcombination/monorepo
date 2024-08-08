import { FC } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { strapiRequest } from '@fc/lib'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import { CoursePayment, StrapiLocale } from '@fc/types'
import { DonationCompleteTemplate } from '@fc/ui'

import { Layout } from '../../components'

type PaymentCompletePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const CoursePaymentComplete: FC<PaymentCompletePageProps> = ({
  status,
  slug,
}) => {
  return (
    <Layout seo={{ title: 'Payment' }}>
      <DonationCompleteTemplate status={status} slug={slug} />
    </Layout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context
  const locale = context.locale as StrapiLocale
  try {
    if (query.status === 'cancel') {
      return {
        props: {
          status: 'cancel',
          slug: query.slug as string,
          ...(await ssrTranslations(locale)),
        },
      }
    }

    if (!query.id || !query.status || !query.session_id) {
      return {
        props: {
          status: 'error',
          slug: undefined,
          ...(await ssrTranslations(locale)),
        },
      }
    }

    const response = await strapiRequest<CoursePayment>({
      id: Number(query.id),
      endpoint: 'payments',
      populate: [],
    })

    if (response?.data?.checkoutSessionId !== query.session_id) {
      return {
        props: {
          status: 'error',
          slug: undefined,
          ...(await ssrTranslations(locale)),
        },
      }
    }

    const status = response?.data?.status

    return {
      props: {
        status,
        slug: query.slug as string,
        ...(await ssrTranslations(locale)),
      },
    }
  } catch (error) {
    return {
      props: {
        status: 'error',
        slug: undefined,
        ...(await ssrTranslations(locale)),
      },
    }
  }
}

export default CoursePaymentComplete
