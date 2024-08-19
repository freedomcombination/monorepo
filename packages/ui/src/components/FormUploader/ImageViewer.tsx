import { FC } from 'react'

import { Portal } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaArrowDownWideShort } from 'react-icons/fa6'

import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@fc/chakra'

import { MenuFileItem } from './MenuFileItem'
import { ImageViewerProps } from './types'

export const ImageViewer: FC<ImageViewerProps> = ({
  files,
  fetchFiles,
  onDelete,
  oldFiles,
}) => {
  const { t } = useTranslation()

  return (
    <Menu positioning={{ placement: 'bottom' }}>
      <MenuButton value="image-view-menu">
        <IconButton
          icon={<FaArrowDownWideShort />}
          aria-label="Show Menu"
          variant={'outline'}
          rounded={0}
          size={'sm'}
          boxSize={12}
          border={0}
          colorScheme="gray"
        />
      </MenuButton>
      <Portal>
        <MenuList zIndex={9999} maxH={400} overflowY={'auto'} w={500} p={0}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <MenuFileItem
                renderSeparator={index > 0}
                key={file.url}
                file={file}
                onDelete={onDelete}
              />
            ))
          ) : (
            <MenuItem value={oldFiles ? 'old' : 'new'} onClick={fetchFiles}>
              {oldFiles ? t('form.uploader.old') : t('form.uploader.new')}
            </MenuItem>
          )}
        </MenuList>
      </Portal>
    </Menu>
  )
}
