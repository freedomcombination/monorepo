import { FC, ReactNode, useEffect } from 'react'

import {
  Box,
  Button,
  Center,
  IconButton,
  Stack,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { FaCheck, FaTrash } from 'react-icons/fa6'

import { API_URL } from '@fc/config'
import { UploadFile } from '@fc/types'

import { WImage } from '../WImage'

type MenuImageItemProps = {
  image: UploadFile
  onDelete: (image: UploadFile) => void
}

type MenuImageButtonProps = {
  url: string
  children: ReactNode
}

const MenuImageButton: FC<MenuImageButtonProps> = ({ url, children }) => {
  const { onCopy, setValue, hasCopied } = useClipboard('')

  useEffect(() => {
    // TODO: Change it to link if it's not an image
    setValue(`![image](${API_URL}${url})`)
  }, [url])

  return (
    <Button
      aria-label="Select Image Format"
      variant={'outline'}
      onClick={onCopy}
      overflow={'hidden'}
    >
      {children}
      {hasCopied && (
        <Center
          pos={'absolute'}
          left={0}
          right={0}
          boxSize={'full'}
          bg={'white'}
        >
          <VStack spacing={0} textAlign={'center'}>
            <FaCheck />
            <Text fontSize={'xs'}>Copied</Text>
          </VStack>
        </Center>
      )}
    </Button>
  )
}

export const MenuImageItem: FC<MenuImageItemProps> = ({ image, onDelete }) => {
  const entries = Object.entries(image.formats ?? {})

  return (
    <Box pos={'relative'}>
      {/* TODO: Display pdf icon for pdfs, File icon for other file types */}
      <WImage src={image} w={'full'} h={100} objectFit="cover" />
      <IconButton
        pos={'absolute'}
        top={2}
        right={2}
        onClick={() => onDelete(image)}
        icon={<FaTrash />}
        isRound
        variant={'outline'}
        bg={'white'}
        colorScheme={'red'}
        aria-label={'Delete'}
      />
      <Stack p={2} textAlign={'center'} fontSize={'sm'}>
        <Box>
          <Text>{image.name}</Text>
          <Text>
            {image.width} x {image.height}
          </Text>
        </Box>
        <Wrap justify={'center'}>
          <MenuImageButton url={image.url} key={image.url}>
            <VStack fontSize={'xs'} spacing={0}>
              <Box>Original</Box>
              <Box>
                {image.width} x {image.height}
              </Box>
            </VStack>
          </MenuImageButton>
          {entries
            .sort((a, b) => {
              const aWidth = a[1].width
              const bWidth = b[1].width

              return aWidth > bWidth ? -1 : 1
            })
            .map(([key, value]) => (
              <MenuImageButton key={value.url} url={value.url}>
                <VStack fontSize={'xs'} spacing={0}>
                  <Box>{key}</Box>
                  <Box>
                    {value.width} x {value.height}
                  </Box>
                </VStack>
              </MenuImageButton>
            ))}
        </Wrap>
      </Stack>
    </Box>
  )
}
