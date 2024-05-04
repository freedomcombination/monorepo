import { FC } from 'react'

import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { Foundation } from '@fc/types'

import { FoundationDetailItem } from './FoundationDetailItem'

type FoundationDetailsProps = {
  foundation: Foundation
}
export const FoundationDetails: FC<FoundationDetailsProps> = ({
  foundation,
}) => {
  const { t } = useTranslation()

  return (
    <Stack
      justify={'space-between'}
      flexWrap={'wrap'}
      direction={{ base: 'column', lg: 'row' }}
      w={'full'}
      gap={8}
      p={8}
      bg="white"
      rounded="lg"
      shadow="base"
    >
      <Stack>
        <FoundationDetailItem
          direction={'column'}
          align={'start'}
          textAlign={'left'}
          label={t('address')}
          display={'block'}
          lineHeight={'1.7'}
          value={foundation?.contact?.address}
          alignedLeft
        />
      </Stack>

      <Stack>
        <FoundationDetailItem label={t('email')} value={foundation?.email} />
        <FoundationDetailItem
          label={'Website'}
          value={foundation?.contact?.website}
        />
      </Stack>
      <Stack>
        <FoundationDetailItem label={'BIC'} value={foundation?.BIC} />
        <FoundationDetailItem label={'IBAN'} value={foundation?.IBAN1} />
      </Stack>
      <Stack>
        <FoundationDetailItem label={'KVK'} value={foundation?.KVK} />
        <FoundationDetailItem label={'RSIN'} value={foundation?.RSIN} />
      </Stack>
    </Stack>
  )
}
