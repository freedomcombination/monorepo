import { FC } from 'react'

import { Box, Center, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaExternalLinkAlt } from 'react-icons/fa'

import { PlatformTemplateProps } from './types'
import { AcademyCard } from '../AcademyCard'
import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { Markdown } from '../Markdown'
import { WImage } from '../WImage'

export const PlatformTemplate: FC<PlatformTemplateProps> = ({
  seo,
  source,
  image,
  link,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { slug } = router.query

  if (!source) return null

  return (
    <Container maxW="container.md">
      <Stack py={8} gap={8} align="center">
        <Box boxSize={300}>
          <WImage
            src={image}
            rounded="full"
            shadow="base"
            alt={seo.title as string}
            ratio={1}
          />
        </Box>

        <Heading as="h1" textAlign="center">
          {seo.title}
        </Heading>
        <Box textAlign={{ base: 'left', lg: 'justify' }}>
          <Markdown source={source} />
        </Box>
        <Center>
          {!!link && (
            <ButtonLink
              isExternal
              href={link}
              size="lg"
              rightIcon={<FaExternalLinkAlt />}
            >
              {t('visit-website')}
            </ButtonLink>
          )}
        </Center>
        {slug === 'academy' && (
          <Box w="100%" p={2}>
            <SimpleGrid columns={{ base: 1, sm: 3 }} gap={6}>
              <AcademyCard
                image={'/images/courses.png'}
                href="/courses"
                title={t('courses')}
              />
              <AcademyCard
                image={'/images/software-card.jpeg'}
                href="/platforms/academy/software"
                title={t('software')}
              />
              <AcademyCard
                image={'/images/seminar.jpeg'}
                href="/platforms/academy/seminars"
                title={t('seminars')}
              />
            </SimpleGrid>
          </Box>
        )}
      </Stack>
    </Container>
  )
}
