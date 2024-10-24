import { FC } from 'react'

import { Box } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {
  MdDeleteOutline,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'

import {
  IconButton,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@fc/chakra'

import { ArtCardActionsProps } from './types'

export const ArtCardActions: FC<ArtCardActionsProps> = ({
  isPublished,
  onHandleAction,
}) => {
  const { t } = useTranslation('common')

  return (
    <MenuRoot>
      <MenuTrigger value="art-card-menu" asChild>
        <IconButton
          aria-label="Art actions"
          color="white"
          colorPalette="blackAlpha"
          borderColor="whiteAlpha.500"
          borderWidth={1}
          icon={<BsThreeDotsVertical />}
          rounded="full"
        />
      </MenuTrigger>
      <MenuContent fontSize="md">
        {/* Publish */}
        {isPublished && (
          <MenuItem
            value="unpublish"
            onClick={() => onHandleAction('unpublish')}
          >
            <Box as={MdOutlineUnpublished} mr={2} />
            <>{t('unpublish')}</>
          </MenuItem>
        )}

        {/* Unpublish */}
        {!isPublished && (
          <MenuItem value="publish" onClick={() => onHandleAction('publish')}>
            <Box as={MdOutlinePublishedWithChanges} mr={2} />
            <>{t('publish')}</>
          </MenuItem>
        )}

        {/* Delete  */}
        <MenuItem
          value="delete"
          color="red.500"
          onClick={() => onHandleAction('delete')}
        >
          <Box as={MdDeleteOutline} mr={2} />
          <>{t('delete')}</>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
