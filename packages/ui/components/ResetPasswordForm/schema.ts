import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export const resetPasswordSchema = (t: TFunction) =>
  yup.object({
    password: yup
      .string()
      .min(8, t('login.password.warning', { count: 8 }) as string)
      .required()
      .matches(
        RegExp('(.*[a-z].*)'),
        t('login.password.matches.lowercase') as string,
      )
      .matches(
        RegExp('(.*[A-Z].*)'),
        t('login.password.matches.uppercase') as string,
      )
      .matches(
        RegExp('(.*\\d.*)'),
        t('login.password.matches.number') as string,
      ),
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref('password'), ''],
        t('login.password.matches.password-match') as string,
      ),
  })
