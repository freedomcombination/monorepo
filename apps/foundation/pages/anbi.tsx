import { FC } from 'react'

import { Box, Heading, SimpleGrid, Stack, Text, Group } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useTranslation } from 'next-i18next'
import { GrDocumentDownload } from 'react-icons/gr'

import { API_URL } from '@fc/config/constants'
import { strapiRequest } from '@fc/services/common/strapiRequest'
import { ssrTranslations } from '@fc/services/ssrTranslations'
import type { Foundation, StrapiLocale } from '@fc/types'
import { ButtonLink } from '@fc/ui/components/ButtonLink'
import { Container } from '@fc/ui/components/Container'
import { Hero } from '@fc/ui/components/Hero'

import { DirectorsCard, FoundationDetails, Layout } from '../components'

type AnbiPageProps = InferGetStaticPropsType<typeof getStaticProps>

const AnbiPage: FC<AnbiPageProps> = ({ foundation }) => {
  const { t } = useTranslation()

  const title = 'ANBI'

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} />
      <Box minH="inherit" fontWeight={500}>
        <Container minH="inherit" py={{ base: 8, lg: 16 }}>
          <Stack gap={16} textAlign={'center'}>
            {/*  foundation details*/}
            <Stack>
              <Heading as="h3" size="lg" fontWeight={700}>
                Stichting Wees de Stem voor Vrijheid
              </Heading>
              <Text fontSize={'sm'} fontStyle={'italic'}>
                {t('anbi-description')}
              </Text>
            </Stack>

            <FoundationDetails foundation={foundation} />

            {/* directors */}
            <Stack gap={4}>
              <Heading as="h3" size="lg" fontWeight={700}>
                {t('foundation.management')}
              </Heading>
              <SimpleGrid gap={4} columns={{ base: 1, lg: 3 }} w={'full'}>
                {foundation.chairman && (
                  <DirectorsCard
                    title={t('foundation.chairman')}
                    name={foundation.chairman}
                  />
                )}
                {foundation.secretary && (
                  <DirectorsCard
                    title={t('foundation.secretary')}
                    name={foundation.secretary}
                  />
                )}

                {foundation.accountant && (
                  <DirectorsCard
                    title={t('foundation.treasurer')}
                    name={foundation.accountant}
                  />
                )}
              </SimpleGrid>
            </Stack>
            {/* documents */}

            <Group wrap={'wrap'} gap={4} justify={'center'}>
              {foundation?.policy_plan && (
                <ButtonLink
                  href={API_URL + foundation?.policy_plan?.url}
                  rightIcon={<GrDocumentDownload />}
                  colorPalette={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {t('foundation.policy-plan')}
                </ButtonLink>
              )}

              {foundation?.substantive_financial_annual_report && (
                <ButtonLink
                  href={
                    API_URL +
                    foundation?.substantive_financial_annual_report?.url
                  }
                  rightIcon={<GrDocumentDownload />}
                  colorPalette={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {t('foundation.financial-report')}
                </ButtonLink>
              )}
              {foundation?.remuneration_policy && (
                <ButtonLink
                  href={API_URL + foundation?.remuneration_policy?.url}
                  rightIcon={<GrDocumentDownload />}
                  colorPalette={'blackAlpha'}
                  variant={'ghost'}
                  color={'initial'}
                  isExternal
                >
                  {t('foundation.remuneration-policy')}
                </ButtonLink>
              )}
            </Group>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}

export default AnbiPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const foundationsData = await strapiRequest<Foundation>({
    endpoint: 'foundations',
  })

  const foundation = foundationsData?.data?.[0]

  if (!foundation) return { notFound: true }

  return {
    props: {
      ...(await ssrTranslations(locale)),
      foundation,
    },
    revalidate: 1,
  }
}
