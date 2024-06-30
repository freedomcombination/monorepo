import { FC } from 'react'

import { Badge, BadgeProps } from '@chakra-ui/react'

type PaidBadgesProps = {
  hasPaid: boolean | null
} & BadgeProps

export const PaidBadges: FC<PaidBadgesProps> = ({ hasPaid, ...rest }) => {
  return (
    <Badge
      variant="outline"
      {...rest}
      colorScheme={hasPaid ? 'purple' : 'gray'}
    >
      {/* TODO add translation */}
      {hasPaid ? 'Paid' : 'Not Yet'}
    </Badge>
  )
}
