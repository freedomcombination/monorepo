import { FC, ReactNode, useEffect } from 'react'

import {
  Box,
  Button,
  Center,
  Divider,
  IconButton,
  Stack,
  Text,
  VStack,
  Wrap,
  useClipboard,
} from '@chakra-ui/react'
import { FaCheck, FaFile, FaFilePdf, FaTrash } from 'react-icons/fa6'

import { API_URL } from '@fc/config'
import { UploadFile } from '@fc/types'

import { WImage } from '../WImage'

type MenuFileItemProps = {
  file: UploadFile
  onDelete: (file: UploadFile) => void
  renderDivider?: boolean
}

type MenuFileButtonProps = {
  url: string
  isImage: boolean
  name: string
  children: ReactNode
}

const MenuFileButton: FC<MenuFileButtonProps> = ({
  url,
  name,
  isImage,
  children,
}) => {
  const { onCopy, setValue, hasCopied } = useClipboard('')

  useEffect(() => {
    setValue(`${isImage ? '!' : ''}[${name}](${API_URL}${url})`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, isImage, name])

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
          <VStack gap={0} textAlign={'center'}>
            <FaCheck />
            <Text fontSize={'xs'}>Copied</Text>
          </VStack>
        </Center>
      )}
    </Button>
  )
}

export const MenuFileItem: FC<MenuFileItemProps> = ({
  renderDivider = false,
  file,
  onDelete,
}) => {
  const entries = Object.entries(file.formats ?? {})
  const isImage = file.mime.startsWith('image')

  return (
    <Box pos={'relative'}>
      {renderDivider && <Divider my={2} />}
      {isImage ? (
        <WImage src={file} w={'full'} h={100} objectFit="cover" />
      ) : (
        <Box
          w={'full'}
          h={100}
          p={2}
          as={file.mime.endsWith('pdf') ? FaFilePdf : FaFile}
        />
      )}
      <IconButton
        pos={'absolute'}
        top={renderDivider ? 4 : 2}
        right={2}
        onClick={() => onDelete(file)}
        icon={<FaTrash />}
        isRound
        variant={'outline'}
        bg={'white'}
        colorScheme={'red'}
        aria-label={'Delete'}
      />
      <Stack p={2} textAlign={'center'} fontSize={'sm'}>
        <Box>
          <Text>{file.name}</Text>
          {isImage ? (
            <Box>
              {file.width} x {file.height}
            </Box>
          ) : (
            <Box>{(file.size / 1024).toFixed(2)} kb</Box>
          )}
        </Box>
        <Wrap justify={'center'}>
          <MenuFileButton
            url={file.url}
            key={file.url}
            isImage={isImage}
            name={file.name}
          >
            <VStack fontSize={'xs'} gap={0}>
              <Box>original</Box>
              {isImage ? (
                <Box>
                  {file.width} x {file.height}
                </Box>
              ) : (
                <Box>{(file.size / 1024).toFixed(2)} kb</Box>
              )}
            </VStack>
          </MenuFileButton>
          {entries
            .sort((a, b) => {
              const aWidth = a[1].width
              const bWidth = b[1].width

              return aWidth > bWidth ? -1 : 1
            })
            .map(([key, value]) => (
              <MenuFileButton
                key={value.url}
                url={value.url}
                isImage={isImage}
                name={file.name}
              >
                <VStack fontSize={'xs'} gap={0}>
                  <Box>{key}</Box>
                  <Box>
                    {value.width} x {value.height}
                  </Box>
                </VStack>
              </MenuFileButton>
            ))}
        </Wrap>
      </Stack>
    </Box>
  )
}
