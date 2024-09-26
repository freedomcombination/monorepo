import { Stack, Switch } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { useJoinFormContext } from './useJoinFormContext'

export const GeneralInfo = () => {
  const { t } = useTranslation()

  const { register } = useJoinFormContext()

  return (
    <>
      {/* in mailing list and is public */}
      <Stack justify="space-between" direction={{ base: 'column', md: 'row' }}>
        <Switch
          id="in-mailing-list"
          alignItems={'center'}
          display={'flex'}
          {...register('inMailingList')}
        >
          {t('apply-form.in-mailing-list')}
        </Switch>
        <Switch id="is-public" {...register('isPublic')}>
          {t('apply-form.show-in-website')}
        </Switch>
      </Stack>
    </>
  )
}
