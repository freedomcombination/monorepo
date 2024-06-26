import { FC } from 'react'

import { Badge, BadgeProps } from '@chakra-ui/react'

type PublicationBadgesProps = {
  publishedAt: string | null
} & BadgeProps

export const PublicationBadges: FC<PublicationBadgesProps> = ({
  publishedAt,
  ...rest
}) => {
  return (
    <Badge
      variant="outline"
      {...rest}
      colorScheme={publishedAt ? 'purple' : 'gray'}
    >
      {publishedAt ? 'Published' : 'Draft'}
    </Badge>
  )
}
