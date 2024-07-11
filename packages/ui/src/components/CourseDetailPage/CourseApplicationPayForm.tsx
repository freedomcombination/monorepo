import { FC, useState } from 'react'

import {
  Box,
  Button,
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

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { CourseApplicationUnpaid } from '@fc/types'

import { useCourseContext } from './CourseContext'

const EXPLANATION_LIMIT = 30

export const CourseApplicationPayForm: FC = () => {
  const { token, profile } = useAuthContext()
  const { course, refetchApplicants, myApplication } = useCourseContext()
  const application = myApplication!
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
        const result = await axios.post('/api/payment', {
          amount,
          name: application.name,
          email: application.email,
          type: 'one-time',
          profile: profile.id,
          courseApplication: application.id,
          slug: course.slug,
          isCoursePayment: true,
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
      Mutation.put(
        'course-applications',
        application.id,
        data,
        token as string,
      ),
  })
  const onSendInfo = () => {
    mutate({
      paymentExplanation: payExplanation,
    }),
      {
        onSettled: () => {
          refetchApplicants()
        },
      }
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
        width={'120px'}
        gap={4}
        value={payOnline ? 'pay-online' : 'pay-declare'}
        onChange={onRadioChange}
      >
        <Radio value={'pay-online'}>Pay Online</Radio>
        <Radio value={'pay-declare'}>Inform</Radio>
      </RadioGroup>

      <Box minHeight={'200px'} width={'100%'}>
        {payOnline ? (
          <Stack
            gap={4}
            alignItems={'center'}
            // justifyContent={'center'}
          >
            <Stack align="center" width={'full'}>
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

            <Button
              isDisabled={!amount || !profile} // wait until profile is loaded
              leftIcon={<MdOutlinePayment />}
              onClick={onCheckOut}
              isLoading={isFetching}
              colorScheme="primary"
            >
              {t('course.application-check-out')}
              {amount && `  €${amount}`}
            </Button>
          </Stack>
        ) : (
          <VStack gap={4} alignItems={'flex-start'} justifyContent={'center'}>
            <Text fontSize={'sm'} textAlign={'left'}>
              {t('course.application-pay-info-title', {
                limit: EXPLANATION_LIMIT,
              })}
            </Text>
            <Box position={'relative'} w={'100%'}>
              <Text
                position={'absolute'}
                top={-6}
                right={1}
                fontSize={'xs'}
                border={'1px'}
                borderColor={'gray.300'}
                bg={'white'}
                borderRadius={'lg'}
                px={2}
              >
                {payExplanation.length} / 255
              </Text>
              <Textarea
                w={'full'}
                onChange={e => setPayExplanation(e.target.value)}
                placeholder={t('course.application-pay-info-placeholder')}
                size={'sm'}
                isInvalid={payExplanation.length < EXPLANATION_LIMIT}
                resize={'vertical'}
              />
            </Box>
            <Button
              leftIcon={<MdOutlineSend />}
              colorScheme="primary"
              isDisabled={payExplanation.length < EXPLANATION_LIMIT}
              onClick={onSendInfo}
            >
              Send
            </Button>
          </VStack>
        )}
      </Box>
    </HStack>
  )
}
