import { FC, useState } from 'react'

import {
  useToast,
  Stack,
  HStack,
  Switch,
  NumberInput,
  Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  SimpleGrid,
  Heading,
  Button,
} from '@chakra-ui/react'
import { isPast } from 'date-fns'
import { useTranslation } from 'next-i18next'

import { useUpdateModelMutation } from '@fc/services/common/updateModel'
import { CourseApplication, Profile } from '@fc/types'
import { CourseLogic } from '@fc/utils/courseLogic'
import { formatDate } from '@fc/utils/formatDate'
import { formatPrice } from '@fc/utils/formatPrice'

import { CourseApplicationComponentProps } from './CourseApplicationDetails'
import { KeyValue } from '../KeyValueView'

type CourseData = Pick<
  CourseApplication,
  | 'installmentCount'
  | 'installmentInterval'
  | 'installmentStartAfter'
  | 'discount'
>

export const CourseInstallmentDetails: FC<CourseApplicationComponentProps> = ({
  courseLogic,
  onSave = () => {},
}) => {
  const { t } = useTranslation()
  const application = courseLogic.myApplication!
  const [data, setData] = useState<CourseData>({
    installmentCount: application.installmentCount,
    installmentInterval: application.installmentInterval,
    installmentStartAfter: application.installmentStartAfter,
    discount: application.discount,
  })
  const updateModelMutation = useUpdateModelMutation('course-applications')
  const toast = useToast()
  const course = courseLogic.course!
  if (!course.price) return null

  const hasChanged = Object.entries(data).some(
    ([k, v]) => v !== application[k as keyof CourseApplication],
  )
  const newCourseLogic = new CourseLogic(
    course,
    [
      {
        ...application,
        ...data,
      } as CourseApplication,
    ],
    application.profile as Profile,
  )

  const successPayment =
    application.payments?.filter(p => p.status === 'paid') ?? []
  const totalPayment = successPayment.reduce((acc, p) => acc + p.amount, 0) ?? 0
  const lastPaidInstallmentNumber = successPayment.reduce(
    (acc, cur) => (cur.installmentNumber > acc ? cur.installmentNumber : acc),
    1,
  )

  const onSubmit = () => {
    updateModelMutation.mutate(
      {
        id: application.id,
        ...data,
      },
      {
        onSuccess: () => {
          onSave()
        },
        onError: () => {
          toast({ status: 'error', title: t('error') })
        },
      },
    )
  }

  return (
    <Stack spacing={2} borderWidth={1} borderRadius={'lg'} p={4}>
      <KeyValue tKey="course.applicant.details.installment.kv.course-fee">
        {formatPrice(course.price)}
      </KeyValue>
      <KeyValue tKey="course.applicant.details.installment.kv.paid">
        {formatPrice(totalPayment)}
      </KeyValue>
      {totalPayment !== course.price && (
        <>
          <KeyValue tKey="course.applicant.details.installment.kv.course-discount">
            <HStack spacing={6} minH={'40px'}>
              <Switch
                isChecked={typeof data.discount === 'number'}
                onChange={e =>
                  setData({
                    ...data,
                    discount: e.target.checked
                      ? (application.discount ?? 0)
                      : null,
                  })
                }
              />
              {typeof data.discount === 'number' && (
                <NumberInput
                  width="300px"
                  defaultValue={
                    typeof data.discount === 'number' ? data.discount : ''
                  }
                  onChange={(_, e) => setData({ ...data, discount: e })}
                  isInvalid={
                    typeof data.discount === 'number' &&
                    (data.discount < 0 || data.discount > course.price)
                  }
                  min={0}
                  max={course.price - totalPayment}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            </HStack>
          </KeyValue>

          <KeyValue tKey="course.applicant.details.installment.kv.payment-start-date">
            <HStack spacing={6} minH={'40px'}>
              <Switch
                isDisabled={totalPayment > 0}
                isChecked={!!data.installmentStartAfter}
                onChange={e =>
                  setData({
                    ...data,
                    installmentStartAfter: e.target.checked
                      ? (application.installmentStartAfter ??
                        application.createdAt)
                      : null,
                  })
                }
              />
              {totalPayment > 0 && (
                <Text fontSize={'sm'}>
                  {t(
                    'course.applicant.details.installment.kv.payment-start-date.warn',
                  )}
                </Text>
              )}
              {typeof data.installmentStartAfter === 'string' && (
                <Input
                  type="datetime-local"
                  width="300px"
                  value={
                    typeof data.installmentStartAfter === 'string'
                      ? data.installmentStartAfter
                      : application.createdAt
                  }
                  onChange={e =>
                    setData({ ...data, installmentStartAfter: e.target.value })
                  }
                  placeholder={t(
                    'course.applicant.details.installment.kv.payment-start-date.placeholder',
                  )}
                />
              )}
            </HStack>
          </KeyValue>

          <KeyValue tKey="course.applicant.details.installment.kv.installment">
            <HStack spacing={6} minH={'40px'}>
              <Switch
                isDisabled={
                  lastPaidInstallmentNumber >
                  1 /* if more then 1 paid installment should be unchecked */
                }
                isChecked={typeof data.installmentCount === 'number'}
                onChange={e =>
                  setData({
                    ...data,
                    installmentCount: e.target.checked
                      ? (application.installmentCount ?? 1)
                      : null,
                  })
                }
              />
              {typeof data.installmentCount === 'number' && (
                <NumberInput
                  width="300px"
                  defaultValue={
                    typeof data.installmentCount === 'number'
                      ? data.installmentCount
                      : 1
                  }
                  onChange={(_, e) => setData({ ...data, installmentCount: e })}
                  min={lastPaidInstallmentNumber}
                  max={36}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
              {lastPaidInstallmentNumber > 1 && (
                <Text fontSize={'sm'}>
                  {t(
                    'course.applicant.details.installment.kv.installment.warn',
                    {
                      last: lastPaidInstallmentNumber,
                    },
                  )}
                </Text>
              )}
            </HStack>
          </KeyValue>

          <KeyValue tKey="course.applicant.details.installment.kv.installment-interval">
            <HStack spacing={6} minH={'40px'}>
              <Switch
                isDisabled={
                  !data.installmentCount || data.installmentCount <= 1
                }
                isChecked={typeof data.installmentInterval === 'number'}
                onChange={e =>
                  setData({
                    ...data,
                    installmentInterval: e.target.checked
                      ? (application.installmentInterval ?? 1)
                      : null,
                  })
                }
              />
              {!data.installmentCount ||
                (data.installmentCount <= 1 && (
                  <Text fontSize={'sm'}>
                    {t(
                      'course.applicant.details.installment.kv.installment-interval.warn',
                    )}
                  </Text>
                ))}
              {typeof data.installmentInterval === 'number' && (
                <NumberInput
                  width="300px"
                  defaultValue={
                    typeof data.installmentInterval === 'number'
                      ? data.installmentInterval
                      : ''
                  }
                  onChange={(_, e) =>
                    setData({ ...data, installmentInterval: e })
                  }
                  min={1}
                  max={12}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            </HStack>
          </KeyValue>

          <KeyValue
            when={hasChanged}
            tKey="course.applicant.details.installment.kv.preview"
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
              {newCourseLogic.myInstallments.map(installment => (
                <HStack
                  key={installment.installmentNumber}
                  gap={6}
                  borderWidth={1}
                  borderRadius={'lg'}
                  p={2}
                >
                  <Heading size={'lg'}>
                    #{installment.installmentNumber}
                  </Heading>
                  <Stack>
                    <Text fontSize={'md'}>
                      {formatDate(installment.date, 'dd MMMM yyyy')}
                    </Text>
                    <Text fontSize={'2xl'}>
                      {formatPrice(installment.amount)}
                      {installment.payment && (
                        <Text fontSize={'sm'} color={'green.500'}>
                          {t(
                            'course.applicant.details.installment.kv.preview.paid',
                          )}
                        </Text>
                      )}
                      {!installment.payment && isPast(installment.date) && (
                        <Text fontSize={'sm'} color={'red.500'}>
                          {t(
                            'course.applicant.details.installment.kv.preview.passed',
                          )}
                        </Text>
                      )}
                    </Text>
                  </Stack>
                </HStack>
              ))}
            </SimpleGrid>
          </KeyValue>
          <KeyValue title="" divider={false}>
            <Button
              colorScheme="primary"
              onClick={onSubmit}
              isDisabled={!hasChanged}
            >
              {t('save')}
            </Button>
          </KeyValue>
        </>
      )}
    </Stack>
  )
}
