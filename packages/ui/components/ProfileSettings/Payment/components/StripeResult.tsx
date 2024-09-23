import { FC, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { toaster } from '@fc/chakra'

type StripeResultProps = {
  reValidate?: () => void
}

export const StripeResult: FC<StripeResultProps> = ({
  reValidate = () => {},
}) => {
  const { query } = useRouter()
  const { t } = useTranslation()

  const status = query.status as string

  const toastIdRef = useRef<string>()

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
        type: success ? 'success' : 'error',
        duration: 5000,
      }

      if (toastIdRef.current) {
        toaster.update(toastIdRef.current, toastContext)
      } else {
        toastIdRef.current = toaster.create(toastContext)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return <Box />
}
