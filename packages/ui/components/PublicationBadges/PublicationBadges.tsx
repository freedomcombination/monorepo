import { FC } from 'react'

import { Badge, BadgeProps } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { renderPublicationState } from '../../hooks/tables/utils'

type PublicationBadgesProps = {
  publishedAt: string | null
} & BadgeProps

export const PublicationBadges: FC<PublicationBadgesProps> = ({
  publishedAt,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <Badge
      variant="outline"
      {...rest}
      colorScheme={publishedAt ? 'purple' : 'gray'}
    >
      {renderPublicationState(publishedAt, t)}
    </Badge>
  )
}
