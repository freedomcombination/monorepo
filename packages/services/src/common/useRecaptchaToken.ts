import { useEffect, useState } from 'react'

import { useReCaptcha } from 'next-recaptcha-v3'

import { RecaptchaKeys } from '@fc/config'

export const useRecaptchaToken = (key: RecaptchaKeys) => {
  const [token, setToken] = useState<string>()

  const { executeRecaptcha, loaded } = useReCaptcha()

  useEffect(() => {
    if (!loaded || !executeRecaptcha) {
      return
    }

    executeRecaptcha(key).then(setToken)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, loaded])

  return token
}
