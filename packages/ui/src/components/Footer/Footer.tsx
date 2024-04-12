import { FC } from 'react'

import { Box, Stack, Text, Wrap } from '@chakra-ui/react'
import NextImage from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { FooterNav } from './FooterNav'
import { FooterProps } from './types'
import { Container } from '../Container'
import { SocialButtons } from '../SocialButtons'

export const Footer: FC<FooterProps> = ({
  name,
  menu,
  about,
  logo,
  socialItems,
}) => {
  const { t } = useTranslation()

  return (
    <Box
      bgGradient={'linear(to-b, primary.400, primary.600)'}
      color="white"
      pos="relative"
    >
      <Container as={Stack}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={8}
          py={10}
          justify="space-between"
          align={{ base: 'center', lg: 'start' }}
        >
          <Stack align="center" maxW={250}>
            <Link href="/">
              <NextImage width={92} height={92} src={logo} alt="logo" />
            </Link>
            <Text textAlign="center" paddingLeft={1} mx={2} my={2}>
              {t(`footer-about.${about}`)}
            </Text>
          </Stack>
          <FooterNav menu={menu} />
        </Stack>
        <Wrap
          justify={{ base: 'center', sm: 'space-between' }}
          borderTopWidth="0.5px"
          borderTopColor="primary.200"
          py={6}
          spacing={2}
        >
          <Text fontSize={'sm'} mr={1}>
            {/* TODO Fix hydration problem for translation field */}
            &copy;
            <>{t('copyright', { name, year: new Date().getFullYear() })}</>
          </Text>
          <SocialButtons items={socialItems} />
        </Wrap>
      </Container>
    </Box>
  )
}
