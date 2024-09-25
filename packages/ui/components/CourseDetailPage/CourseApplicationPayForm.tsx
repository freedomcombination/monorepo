import { useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { MdOutlinePayment, MdOutlineSend } from 'react-icons/md'

import { SITE_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import { mutation } from '@fc/services/common/mutation'
import type { CourseApplication, CourseApplicationUnpaid } from '@fc/types'
import { formatPrice } from '@fc/utils/formatPrice'

import { useCourseContext } from './useCourseContext'

const EXPLANATION_LIMIT = 30

export const CourseApplicationPayForm = () => {
  const { token, profile } = useAuthContext()
  const { course, refetchApplicants, courseLogic } = useCourseContext()
  const application = courseLogic.myApplication!
  const [payOnline, setPayOnline] = useState(true)
  const [payExplanation, setPayExplanation] = useState('')
  const { t } = useTranslation()
  const [isFetching, setIsFetching] = useState(false)
  const toast = useToast()
  const amount = course.price
  const onRadioChange = (value: string) => {
    setPayOnline(value === 'pay-online')
  }

  const onCheckOut = async () => {
    if (profile === null || token === null) return
    setIsFetching(true)
    const fetchAsync = async () => {
      try {
        const result = await axios.post('/api/course-payment', {
          amount,
          name: application.name,
          email: application.email,
          type: 'one-time',
          profile: profile.id,
          courseApplication: application.id,
          returnUrl: `${SITE_URL}/courses/${course.slug}?`,
          installmentNumber: 1,
          token,
        })

        window.location = result.data
      } catch (e) {
        console.error('request course payment error', e)
        toast({
          title: t('payment.dialog.unknown.title'),
          description: t('payment.dialog.unknown.description'),
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    fetchAsync().finally(() => setIsFetching(false))
  }

  const { mutate } = useMutation({
    mutationKey: ['course-send-info'],
    mutationFn: (data: CourseApplicationUnpaid) =>
      mutation<CourseApplication, CourseApplicationUnpaid>({
        endpoint: 'course-applications',
        method: 'put',
        id: application.id,
        body: data,
        token: token as string,
      }),
  })
  const onSendInfo = () => {
    mutate(
      {
        paymentExplanation: payExplanation,
      },
      {
        onSettled: () => {
          refetchApplicants()
        },
      },
    )
  }

  return (
    <HStack
      gap={4}
      width={'full'}
      justifyItems="stretch"
      justifyContent={'space-between'}
      alignItems={'flex-start'}
    >
      <RadioGroup
        flexShrink={0}
        flexGrow={0}
        display={'flex'}
        flexDirection={'column'}
        justifyItems={'flex-start'}
        width={'180px'}
        gap={6}
        value={payOnline ? 'pay-online' : 'pay-declare'}
        onChange={onRadioChange}
      >
        <Radio value={'pay-online'}>
          <VStack alignItems={'flex-start'} gap={0} spacing={0}>
            <Text textAlign={'left'} fontWeight={'bold'}>
              {t('course.application-radio-pay')}
            </Text>
            <Text fontSize={'xs'} textAlign={'left'}>
              {t('course.application-radio-pay-desc')}
            </Text>
          </VStack>
        </Radio>
        <Radio value={'pay-declare'}>
          <VStack alignItems={'flex-start'} gap={0} spacing={0}>
            <Text textAlign={'left'} fontWeight={'bold'}>
              {t('course.application-radio-inform')}
            </Text>
            <Text fontSize={'xs'} textAlign={'left'}>
              {t('course.application-radio-inform-desc')}
            </Text>
          </VStack>
        </Radio>
      </RadioGroup>

      <Box minHeight={'200px'} width={'100%'}>
        {payOnline ? (
          <Stack
            gap={4}
            // alignItems={'center'}
            minH={'inherit'}
            // justifyContent={'center'}
            alignItems={'flex-start'}
            justifyContent={'center'}
          >
            <Stack width={'full'} flex={1}>
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
              <Text textAlign="left" fontSize="md" color="gray.500">
                {t('donation.check-payment-method')}
              </Text>
            </Stack>

            <Button
              isDisabled={!amount || !profile} // wait until profile is loaded
              leftIcon={<MdOutlinePayment />}
              onClick={onCheckOut}
              isLoading={isFetching}
              colorScheme="primary"
            >
              {t('course.application-check-out')}
              {amount && `  ${formatPrice(amount)}`}
            </Button>
          </Stack>
        ) : (
          <VStack
            minH={'inherit'}
            gap={4}
            alignItems={'flex-start'}
            justifyContent={'center'}
          >
            <FormControl position={'relative'} w={'100%'} flex={1}>
              <HStack>
                <FormLabel flex={1} fontSize={'sm'} textAlign={'left'}>
                  {t('course.application-pay-info-title', {
                    limit: EXPLANATION_LIMIT,
                  })}
                </FormLabel>
                <Text
                  mb={2}
                  flexShrink={0}
                  fontSize={'xs'}
                  border={'1px'}
                  borderColor={'gray.300'}
                  bg={'white'}
                  borderRadius={'lg'}
                  px={2}
                >
                  {payExplanation.length} / 255
                </Text>
              </HStack>
              <Textarea
                w={'full'}
                onChange={e => setPayExplanation(e.target.value)}
                placeholder={t('course.application-pay-info-placeholder')}
                size={'sm'}
                isInvalid={payExplanation.length < EXPLANATION_LIMIT}
                resize={'vertical'}
              />
            </FormControl>
            <Button
              leftIcon={<MdOutlineSend />}
              colorScheme="primary"
              isDisabled={payExplanation.length < EXPLANATION_LIMIT}
              onClick={onSendInfo}
              justifySelf={'end'}
            >
              Send
            </Button>
          </VStack>
        )}
      </Box>
    </HStack>
  )
}
