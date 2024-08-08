import { FC, ReactNode } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react'
import { addMonths, format, isAfter } from 'date-fns'
import { isPast } from 'date-fns/isPast'
import { useRouter } from 'next/router'

import { useAuthContext } from '@fc/context'
import { useStrapiRequest } from '@fc/services'
import { CourseApplication } from '@fc/types'

export const CoursesTab: FC = () => {
  const { profile } = useAuthContext()
  const { data } = useStrapiRequest<CourseApplication>({
    endpoint: 'course-applications',
    filters: {
      profile: { id: { $eq: profile?.id } },
    },
    queryOptions: {
      enabled: !!profile,
    },
  })

  const applications = data?.data || []

  return (
    <Stack>
      {applications.length > 0 ? (
        <Accordion allowMultiple={false} width={'100%'} maxWidth={'100%'}>
          {applications.map(application => (
            <ApplicationView key={application.id} application={application} />
          ))}
        </Accordion>
      ) : (
        <Center>
          <Link href="/courses">
            <Button colorScheme="primary" size="lg" variant={'outline'}>
              Goto Courses
            </Button>
          </Link>
        </Center>
      )}
    </Stack>
  )
}

type ApplicationViewProps = {
  application: CourseApplication
}

const ApplicationView: FC<ApplicationViewProps> = ({ application }) => {
  const { locale } = useRouter()
  // const { t } = useTranslation() // TODO add translations
  const course = application.course!

  const getProp = (ca: CourseApplication, prop: string) => {
    return course[`${prop}_${locale}` as keyof CourseApplication['course']]
  }

  const calculateRemainingPrice = () => {
    if (!course.price) return 0

    // that means somehow the applicant has no remaining fee
    if (application.hasPaid) return 0

    const payments = application.payments || []
    if (payments.length > 0) {
      // that means the applicant had made at least one payment
      const totalAmount = payments.reduce((acc, payment) => {
        if (payment.status === 'paid') {
          return acc + payment.amount
        }

        return acc
      }, 0)

      return course.price - totalAmount
    }

    if (
      application.paymentExplanation &&
      application.approvalStatus !== 'rejected'
    ) {
      return 0
    }

    return course.price
  }

  const getGeneralStatus = () => {
    const remaining = calculateRemainingPrice()
    const hasFinished = isPast(course.endDate)
    const hasStarted = isPast(course.startDate)

    if (remaining > 0) {
      if (hasFinished)
        return (
          <Text>
            Biten kurs için ödenmemiş {remaining} euro ücret görünüyor.
          </Text>
        )

      if (hasStarted)
        return (
          <Text>
            Devam eden kurs için ödenmemiş {remaining} euro ücret görünüyor.
          </Text>
        )

      return (
        <Text>
          Kurs {course.startDate} tarihinde başlayacak ve {remaining} euro
          ödenmemiş ücret görünüyor.
        </Text>
      )
    }

    if (isPast(course.endDate)) return <Text>Kurs bitmiş.</Text>

    if (isPast(course.startDate)) return <Text>Kurs devam ediyor.</Text>

    return <Text>Kurs {course.startDate} tarihinde başlayacak.</Text>
  }

  const getCoursePaymentDetails = () => {
    if (!course.price) return
    const remaining = calculateRemainingPrice()
    if (remaining === 0) {
      return (
        <LineText
          title={'Ödenen Toplam Tutar'}
          value={`${course.price} euro`}
        />
      )
    }

    const installmentCount = application.installmentCount || 1

    if (installmentCount === 1) {
      return (
        <LineText
          title={'Kalan ücreti öde'}
          value={<PaymentButton amount={remaining} />}
        />
      )
    }

    const successfulPayments =
      application.payments?.filter(payment => payment.status === 'paid') ?? []
    const remainingInstallments = Math.max(
      installmentCount - successfulPayments.length,
      1,
    )
    const lastSuccessfulPaymentData = successfulPayments.reduce(
      (acc, payment) => {
        if (isAfter(payment.paymentDatetime, acc)) {
          return payment.paymentDatetime
        }

        return acc
      },
      application.createdAt,
    )

    const installmentDates = new Array(remainingInstallments)
      .fill(0)
      .map((_, index) => {
        return {
          date: addMonths(lastSuccessfulPaymentData, index + 1),
          amount: remaining / remainingInstallments,
        }
      })

    return (
      <>
        {successfulPayments.length > 0 &&
          successfulPayments.map(payment => (
            <LineText
              key={payment.id}
              title={`${format(payment.paymentDatetime, 'dd MM yyyy - HH:mm')} tarihinde`}
              value={`${payment.amount} euro ödendi.`}
            />
          ))}
        {installmentDates.map(({ date, amount }, index) => (
          <LineText
            key={date.toString()}
            title={`${index + 1}. taksit ${format(date, 'MMMM yyyy')} tarihinde`}
            value={<PaymentButton amount={amount} />}
          />
        ))}
      </>
    )
  }

  return (
    <AccordionItem key={application.id} maxWidth={'100%'}>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          <VStack alignItems={'flex-start'}>
            <Text fontWeight={600}>{getProp(application, 'title')}</Text>
            <LineText title={'Status'} value={getGeneralStatus()} />
          </VStack>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pr={4} overflow={'auto'}>
        <VStack alignItems={'flex-start'} gap={4}>
          <LineText
            title="Kurs sayfası"
            value={<Link href={`courses/${course.slug}`}>Sayfaya git.</Link>}
          />
          {getCoursePaymentDetails()}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  )
}

type LineTextProps = {
  title: ReactNode
  value: ReactNode
}
const LineText: FC<LineTextProps> = ({ title, value }) => {
  return (
    <HStack fontSize={'sm'} flexDir={'row'} display={'flex'} gap={4}>
      <Text width={'120px'} textAlign={'right'}>
        {title}
      </Text>{' '}
      {value}
    </HStack>
  )
}

type PaymentButtonProps = {
  amount: number
  onPayment?: () => void
}

const PaymentButton: FC<PaymentButtonProps> = ({ amount }) => {
  const toast = useToast()
  const makePayment = () => {
    // TODO: Implement payment
    // like packages\ui\src\components\CourseDetailPage\CourseApplicationPayForm.tsx line 48

    toast({
      title: 'Payment',
      description: 'Payment is not implemented yet.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Button
      colorScheme="primary"
      size="lg"
      variant={'outline'}
      onClick={makePayment}
    >
      Pay {amount} euro
    </Button>
  )
}
