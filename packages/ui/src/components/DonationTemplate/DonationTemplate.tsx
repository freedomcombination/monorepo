import { FC, useState } from 'react'

import {
  Center,
  Group,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { FaDonate, FaExternalLinkAlt } from 'react-icons/fa'
import QRCode from 'react-qr-code'
import * as yup from 'yup'

import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
} from '@fc/chakra'
import { DONATION_REQUEST_LINK } from '@fc/config'
import { Platform } from '@fc/types'

import { ButtonLink } from '../ButtonLink'
import { Container } from '../Container'
import { FormItem } from '../FormItem'
import { PlatformList } from '../PlatformList'

function generateSchema() {
  return yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
}

type FormFieldValues = {
  name: string
  email: string
}

type DonationTemplateProps = {
  platforms?: Platform[]
  isDark?: boolean
}

export const DonationTemplate: FC<DonationTemplateProps> = ({
  platforms,
  isDark,
}) => {
  const [amountRange, setAmountRange] = useState([0, 5])
  const [type, setType] = useState<'one-time' | 'monthly'>('one-time')
  const { t } = useTranslation()

  const donationAmounts = useBreakpointValue({
    base: [5, 10, 20, 50],
    sm: [5, 10, 20, 50, 100],
  }) || [5, 10, 20, 50]

  const format = (val: number) => `€` + val
  const parse = (val: string) => +val.replace(/^€/, '')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormFieldValues>({
    resolver: yupResolver(generateSchema()),
    mode: 'onTouched',
  })

  const onSubmit = async (data: FormFieldValues) => {
    try {
      const { name, email } = data

      const result = await axios.post('/api/donation', {
        amount: amountRange[1],
        name,
        email,
        type,
      })

      window.location = result.data
    } catch (error) {
      console.error('request payment error', error)
    }
  }

  return (
    <Container {...(!platforms && { maxW: '2xl' })}>
      <SimpleGrid
        alignItems="start"
        columns={{ base: 1, lg: platforms ? 2 : 1 }}
        my={16}
        gap={8}
        pos={'relative'}
      >
        <Stack gap={8}>
          {DONATION_REQUEST_LINK && (
            <VStack p={4} gap={4} rounded="lg" shadow="lg" bg={'white'}>
              <Center>
                <QRCode value={DONATION_REQUEST_LINK} />
              </Center>
              <ButtonLink
                isExternal
                href={DONATION_REQUEST_LINK}
                rightIcon={<FaExternalLinkAlt />}
                w={256}
              >
                {t('donation.now')}
              </ButtonLink>
            </VStack>
          )}
          <Stack
            px={{ base: 8, lg: 16 }}
            py={{ base: 8, lg: 12 }}
            gap={8}
            bg={'white'}
            {...(isDark && {
              borderColor: 'whiteAlpha.200',
              borderWidth: 2,
              bg: 'whiteAlpha.200',
            })}
            rounded="lg"
            shadow="lg"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            pos={{ lg: 'sticky' }}
            top={16}
          >
            <Heading as="h3" size="lg" textAlign="center" fontWeight={900}>
              {t('donation.title')}
            </Heading>

            <Stack align="center">
              <HStack gap={4}>
                <Image src={`/images/ideal-logo.svg`} h={50} alt="ideal" />

                <Image
                  src={`/images/visa-master-logo.svg`}
                  h={50}
                  alt="visa mastercard"
                />
                <Image src={`/images/apple-pay.svg`} h={50} alt="apple pay" />

                <Image src={`/images/google-pay.svg`} h={50} alt="google pay" />
              </HStack>
              <Text textAlign="center" fontSize="md" color="gray.500">
                {t('donation.check-payment-method')}
              </Text>
            </Stack>

            <Group w="full" attached alignSelf="center">
              {donationAmounts.map(val => (
                <Button
                  size="lg"
                  data-testid={`button-donation-${val}`}
                  w="full"
                  key={val}
                  variant={amountRange[1] === val ? 'solid' : 'outline'}
                  colorPalette={amountRange[1] === val ? 'primary' : 'gray'}
                  onClick={() => setAmountRange([0, val])}
                >
                  €{val}
                </Button>
              ))}
            </Group>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              pb={8}
              w="full"
              justify="center"
              align="center"
              gap={6}
            >
              <NumberInput
                maxW={120}
                onValueChange={e => setAmountRange([0, parse(e.value)])}
                value={format(amountRange[1])}
                min={5}
                size="lg"
              >
                <NumberInputField data-testid="input-donation" />
                <NumberInputStepper>
                  <NumberIncrementStepper data-testid="button-donation-increment" />
                  <NumberDecrementStepper data-testid="button-donation-decrement" />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex={1}
                id="slider"
                defaultValue={[0, 5]}
                value={amountRange}
                min={5}
                max={100}
                colorPalette="primary"
                onValueChange={e => setAmountRange(e.value)}
                thumbSize={{ width: 6, height: 6 }}
              />
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }} gap={4}>
              <FormItem
                required
                register={register}
                name="name"
                autoComplete="name"
                errors={errors}
              />
              <FormItem
                required
                register={register}
                name="email"
                autoComplete="email"
                errors={errors}
              />
            </Stack>

            <Stack>
              <Button
                data-testid="button-donation-submit"
                disabled={!amountRange || !isValid}
                type="submit"
                leftIcon={<FaDonate />}
                onClick={() => setType('one-time')}
                colorPalette="primary"
              >
                {t('donation.title')}
                {amountRange && ` €${amountRange}`}
              </Button>
              {/* TODO: Enable it once we have Sepa payment method activated */}
              {/* <Button
              disabled={!amount || !isValid}
              type="submit"
              leftIcon={<FaDonate />}
              onClick={() => setType('monthly')}
              colorPalette="purple"
            >
              {t('donation.monthly')}
              {amount && ` €${amount}`}
            </Button> */}
            </Stack>
          </Stack>
        </Stack>
        {platforms && <PlatformList platforms={platforms} />}
      </SimpleGrid>
    </Container>
  )
}
