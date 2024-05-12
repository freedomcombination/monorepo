import { FC } from 'react'

import {
  HStack,
  IconButton,
  MenuGroup,
  MenuItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FaTrash } from 'react-icons/fa6'

import { FileFormat, UploadFile } from '@fc/types'

import { WImage } from '../WImage'

type MenuImageItemProps = {
  image: UploadFile
  onSelect: (image: UploadFile, format: FileFormat) => void
  onDelete: (image: UploadFile) => void
}

export const MenuImageItem: FC<MenuImageItemProps> = ({
  image,
  onSelect,
  onDelete,
}) => {
  const entries = Object.entries(image.formats ?? {})

  return (
    <MenuGroup
      w={'full'}
      h={60}
      p={2}
      borderRadius={'md'}
      borderWidth={1}
      border={'solid'}
      borderColor={'gray.200'}
    >
      <HStack>
        <WImage
          src={image}
          borderRadius={'xl'}
          overflow={'hidden'}
          m={1}
          maxW={200}
          boxShadow={'lg'}
        />
        <Stack flex={1}>
          <Text>{image.name}</Text>
          <Text>
            {image.width} x {image.height}
          </Text>
          <HStack>
            <IconButton
              onClick={() => onDelete(image)}
              icon={<FaTrash />}
              variant={'outline'}
              rounded={'full'}
              size={'xs'}
              colorScheme={'red'}
              aria-label={'Delete'}
            />
          </HStack>
        </Stack>
      </HStack>
      {entries.map(([key, value]) => (
        <MenuItem
          key={value.url}
          onClick={() => onSelect(image, value)}
          ml={4}
          borderLeft={'1px solid'}
        >
          {key} - {value.width} x {value.height}
        </MenuItem>
      ))}
    </MenuGroup>
  )
}
