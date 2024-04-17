import { FC } from 'react'

import { IconButton } from '@chakra-ui/react'
import { FaInfo } from 'react-icons/fa6'

import { ArchivePopover } from '../GenAI/ArchivePopover'
import { usePostContext } from '../PostProvider'

export const PostSentenceReference: FC = () => {
  const { sentence } = usePostContext()

  return (
    <>
      <ArchivePopover
        archiveId={sentence?.archiveId ?? 0}
        includeContent={true}
      >
        <IconButton
          aria-label="Manage sentences"
          icon={<FaInfo />}
          variant={'outline'}
          isRound
        />
      </ArchivePopover>
    </>
  )
}
