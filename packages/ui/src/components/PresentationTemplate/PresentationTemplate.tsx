import { FC } from 'react'

import {
  Box,
  Center,
  HStack,
  Heading,
  List,
  SimpleGrid,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { FaChevronRight, FaDonate } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { Button } from '@fc/chakra'
import { SITE_URL } from '@fc/config'
import { Flow } from '@fc/types'

import { Container } from '../Container'
import { Markdown } from '../Markdown'
import { ShareButtons } from '../ShareButtons'

type PresentationTemplateProps = {
  title: string
  description: string
  flow: Flow[]
  source: MDXRemoteSerializeResult
}

export const PresentationTemplate: FC<PresentationTemplateProps> = ({
  title,
  description,
  flow,
  source,
}) => {
  const { t } = useTranslation()
  const { locale, asPath } = useRouter()

  if (!source) return <Spinner />

  const URL = `${SITE_URL}/${locale}${asPath}`

  return (
    <Container maxW="container.md">
      <Stack py={8} gap={8}>
        <HStack justifyContent={'end'}>
          <ShareButtons url={URL} title={title} quote={description || ''} />
        </HStack>
        <Box textAlign={{ base: 'left', lg: 'justify' }}>
          <Markdown source={source} />
        </Box>
        <SimpleGrid gap={8} columns={{ base: 1, md: 2 }} alignItems={'center'}>
          {flow.length > 0 && (
            <Stack gap={4} order={{ base: 2, md: 1 }}>
              <Heading as="h2" size="md">
                {t('program-flow')}
              </Heading>
              <List.Root gap={4}>
                {flow.map((f, i) => (
                  <List.Item key={i}>
                    <HStack align={'start'}>
                      <List.Icon mt={2}>
                        <FaChevronRight />
                      </List.Icon>
                      <Box>
                        <Box fontWeight={600}>{f.title}</Box>
                        <Box fontSize={'sm'} color={'gray.500'}>
                          {f.duration} - {f.presenter}
                        </Box>
                      </Box>
                    </HStack>
                  </List.Item>
                ))}
              </List.Root>
            </Stack>
          )}
          <Stack gap={4} order={{ base: 1, md: 2 }}>
            <Link
              rel="noreferrer noopener"
              target="_blank"
              href={'https://trendrights.com/tr/hashtags/kusatilmis-ebeveynlik'}
            >
              <Center aspectRatio={{ base: 3, md: 2 }}>
                <Button
                  boxSize={'full'}
                  colorScheme={'trend-rights'}
                  variant={'outline'}
                  fontSize={'2xl'}
                  flexDir={'column'}
                  borderWidth={3}
                  leftIcon={
                    <Box
                      as={FaXTwitter}
                      mb={4}
                      fontSize={{ base: '1.5em', lg: '2em' }}
                    />
                  }
                >
                  PostMaker
                </Button>
              </Center>
            </Link>
            <Link
              rel="noreferrer noopener"
              target="_blank"
              href="https://freedomcombination.com/donation"
            >
              <Center aspectRatio={{ base: 3, md: 2 }}>
                <Button
                  boxSize={'full'}
                  variant={'outline'}
                  fontSize={'2xl'}
                  flexDir={'column'}
                  borderWidth={3}
                  leftIcon={
                    <Box
                      as={FaDonate}
                      mb={4}
                      fontSize={{ base: '1.5em', lg: '2em' }}
                    />
                  }
                >
                  {t('donation.title')}
                </Button>
              </Center>
            </Link>
          </Stack>
        </SimpleGrid>
        {/* TODO: Add images gallery */}
      </Stack>
    </Container>
  )
}
