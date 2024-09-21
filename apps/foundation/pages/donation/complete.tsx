import { FC } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { strapiRequest } from '@fc/lib/request'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Donation, StrapiLocale } from '@fc/types'
import { DonationCompleteTemplate } from '@fc/ui/components/DonationCompleteTemplate'

import { Layout } from '../../components/Layout'

type DonationCompletePageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const DonationComplete: FC<DonationCompletePageProps> = ({ status }) => {
  return (
    <Layout seo={{ title: 'Payment' }}>
      <DonationCompleteTemplate status={status} />
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
          ...(await ssrTranslations(locale)),
        },
      }
    }

    if (!query.id || !query.status || !query.session_id) {
      return {
        props: {
          status: 'error',
          ...(await ssrTranslations(locale)),
        },
      }
    }

    const response = await strapiRequest<Donation>({
      id: Number(query.id),
      endpoint: 'donates',
      populate: [],
    })

    if (response?.data?.checkoutSessionId !== query.session_id) {
      return {
        props: {
          status: 'error',
          ...(await ssrTranslations(locale)),
        },
      }
    }

    const status = response?.data?.status

    return {
      props: {
        status,
        ...(await ssrTranslations(locale)),
      },
    }
  } catch (error) {
    console.error(error)

    return {
      props: {
        status: 'error',
        ...(await ssrTranslations(locale)),
      },
    }
  }
}

export default DonationComplete
