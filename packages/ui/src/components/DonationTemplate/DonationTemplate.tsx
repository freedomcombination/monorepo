import { FC, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  Tooltip,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEuroCircle } from 'react-icons/ai'
import { FaDonate, FaExternalLinkAlt } from 'react-icons/fa'
import QRCode from 'react-qr-code'
import * as yup from 'yup'

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
  const [amount, setAmount] = useState(5)
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
        amount,
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
        <Stack spacing={8}>
          {DONATION_REQUEST_LINK && (
            <VStack p={4} spacing={4} rounded="lg" shadow="lg" bg={'white'}>
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
            spacing={8}
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
              <HStack spacing={4}>
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

            <ButtonGroup w="full" isAttached alignSelf="center" size="lg">
              {donationAmounts.map(val => (
                <Button
                  data-testid={`button-donation-${val}`}
                  w="full"
                  key={val}
                  variant={amount === val ? 'solid' : 'outline'}
                  colorScheme={amount === val ? 'primary' : 'gray'}
                  onClick={() => setAmount(val)}
                >
                  €{val}
                </Button>
              ))}
            </ButtonGroup>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              pb={8}
              w="full"
              justify="center"
              align="center"
              spacing={6}
            >
              <NumberInput
                maxW={120}
                onChange={valueString => setAmount(parse(valueString))}
                value={format(amount)}
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
                defaultValue={5}
                value={amount}
                min={5}
                max={100}
                colorScheme="primary"
                onChange={v => setAmount(v)}
                focusThumbOnChange={false}
              >
                <SliderTrack height={3} rounded="lg">
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="primary.500"
                  color="white"
                  placement="bottom"
                  isOpen={!!amount}
                  label={`€${amount}`}
                >
                  <SliderThumb
                    data-testid="slider-thumb-donation"
                    boxSize={6}
                    bg="primary.500"
                    color="white"
                  >
                    <Box boxSize="full" as={AiOutlineEuroCircle} />
                  </SliderThumb>
                </Tooltip>
              </Slider>
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <FormItem
                isRequired
                register={register}
                name="name"
                autoComplete="name"
                errors={errors}
              />
              <FormItem
                isRequired
                register={register}
                name="email"
                autoComplete="email"
                errors={errors}
              />
            </Stack>

            <Stack>
              <Button
                data-testid="button-donation-submit"
                isDisabled={!amount || !isValid}
                type="submit"
                leftIcon={<FaDonate />}
                onClick={() => setType('one-time')}
                colorScheme="primary"
              >
                {t('donation.title')}
                {amount && ` €${amount}`}
              </Button>
              {/* TODO: Enable it once we have Sepa payment method activated */}
              {/* <Button
              isDisabled={!amount || !isValid}
              type="submit"
              leftIcon={<FaDonate />}
              onClick={() => setType('monthly')}
              colorScheme="purple"
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
