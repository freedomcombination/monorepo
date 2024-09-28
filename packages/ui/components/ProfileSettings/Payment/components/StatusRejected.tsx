import { FC } from 'react'

import { Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { I18nNamespaces } from '../../../../@types/i18next'
import { KeyValue } from '../../../KeyValueView'

export const StatusRejected: FC<{ reason: keyof I18nNamespaces['common'] }> = ({
  reason,
}) => {
  const { t } = useTranslation()

  return (
    <KeyValue tKey="approvalStatus">
      <Text color={'red.500'}>
        {t('course.application.message.rejected-with-reason', {
          msg: t(reason),
        })}
      </Text>
    </KeyValue>
  )
}
