import { FC, useEffect, useRef } from 'react'

import { Box, ToastId, useToast, UseToastOptions } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

type StripeResultProps = {
  reValidate?: () => void
}

export const StripeResult: FC<StripeResultProps> = ({
  reValidate = () => {},
}) => {
  const { query } = useRouter()
  const { t } = useTranslation()

  const status = query.status as string
  const toast = useToast()
  const toastIdRef = useRef<ToastId>()

  useEffect(() => {
    if (status) {
      reValidate()

      const success = status === 'success'
      const toastContext = {
        title: t(success ? 'success' : 'error'),
        description: t(
          success
            ? 'course.payment.message.success'
            : 'course.payment.message.failed',
        ),
        status: success ? 'success' : 'error',
        duration: 5000,
        isClosable: true,
      } as UseToastOptions

      if (toastIdRef.current) {
        toast.update(toastIdRef.current, toastContext)
      } else {
        toastIdRef.current = toast(toastContext)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return <Box />
}
