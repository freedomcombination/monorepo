import { FC } from 'react'

import { Badge, BadgeProps } from '@chakra-ui/react'

type PaidBadgesProps = {
  status: 'paid' | 'not yet' | 'free'
} & BadgeProps

export const PaidBadges: FC<PaidBadgesProps> = ({ status, ...rest }) => {
  const scheme =
    status === 'paid' ? 'green' : status === 'not yet' ? 'gray' : 'purple'
  const text =
    status === 'paid' ? 'Paid' : status === 'not yet' ? 'Not Yet' : 'Free'

  return (
    <Badge variant="outline" {...rest} colorScheme={scheme}>
      {/* TODO add translation */}
      {text}
    </Badge>
  )
}
