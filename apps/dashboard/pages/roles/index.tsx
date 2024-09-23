import { FC } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { StrapiLocale } from '@fc/types'
import { AdminLayout } from '@fc/ui/components/AdminLayout'
import { UserRoles } from '@fc/ui/components/UserRoles'

type RolesPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Roles: FC<RolesPageProps> = () => {
  return (
    <AdminLayout seo={{ title: 'Roles' }}>
      <UserRoles />
    </AdminLayout>
  )
}

export default Roles

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
