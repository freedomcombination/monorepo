import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { CiImageOff } from 'react-icons/ci'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FaFilePdf } from 'react-icons/fa6'
import { IoMdCloudUpload } from 'react-icons/io'

import {
  PlatformSlug,
  Post,
  StrapiEndpoint,
  StrapiModel,
  StrapiTranslatableModel,
  UploadFile,
} from '@fc/types'
import { getMediaUrl } from '@fc/utils'

import { ModelPdf } from './ModelPdf'
import { Caps, FilePicker, VideoPlayer, WImage } from '../../components'

export type ModelMediaProps<T extends FieldValues = FieldValues> = {
  model: StrapiModel
  name?: Path<T>
  isEditing: boolean
  isChangingMedia: boolean
  toggleChangingMedia: () => void
  setValue: UseFormSetValue<T>
  endpoint?: StrapiEndpoint
}

export const ModelMedia = <T extends FieldValues = FieldValues>({
  setValue,
  model,
  isEditing,
  isChangingMedia,
  toggleChangingMedia,
  endpoint,
  name,
}: ModelMediaProps<T>) => {
  const { title, description } = (model || {}) as StrapiTranslatableModel
  const { isOpen, onClose, onOpen } = useDisclosure()

  const key = name || 'image'

  const media = (model as any)?.[key] as UploadFile
  const { ext, mime } = media || {}

  if (Array.isArray(media)) {
    return (
      <Splide>
        {media.map((m, index) => {
          const newModel = {
            ...model,
            [key]: m,
          }

          return (
            <SplideSlide key={index}>
              <ModelMedia
                model={newModel}
                name={name}
                isEditing={isEditing}
                isChangingMedia={isChangingMedia}
                toggleChangingMedia={toggleChangingMedia}
                setValue={setValue}
                endpoint={endpoint}
              />
            </SplideSlide>
          )
        })}
      </Splide>
    )
  }

  const mediaUrl = getMediaUrl(media)
  const isMediaFile = mime?.includes('video') || mime?.includes('image')
  const renderMedia = () => {
    if (isChangingMedia || (isEditing && !media)) {
      return (
        <Stack>
          {media && <Button onClick={toggleChangingMedia}>Cancel</Button>}
          <FilePicker
            allowedFileTypes={['*/*']}
            onLoaded={files =>
              setValue(name as Path<T>, files[0] as PathValue<T, Path<T>>)
            }
          />
        </Stack>
      )
    }

    if (!media) {
      return (
        <Stack
          borderWidth={1}
          rounded={'md'}
          h={300}
          align={'center'}
          justify={'center'}
        >
          <Box as={CiImageOff} boxSize={100} />
          <Text>No media available</Text>
        </Stack>
      )
    }

    if (name === 'video') {
      return <VideoPlayer url={mediaUrl} />
    }
    if (!isMediaFile) {
      return (
        <Center borderWidth={1} rounded={'md'} p={4}>
          <VStack
            _groupHover={{ color: 'primary.500' }}
            _hover={{ cursor: 'pointer' }}
            onClick={onOpen}
          >
            <Box boxSize={50}>
              {ext === '.pdf' ? (
                <FaFilePdf />
              ) : (
                <IconButton
                  icon={<FaExternalLinkAlt />}
                  as="a"
                  href={mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in new tab" // Add the missing aria-label property
                />
              )}
            </Box>
            <HStack>
              <ModelPdf
                mediaUrl={mediaUrl}
                isOpen={isOpen}
                onClose={onClose}
                title={name}
                maxW="90%"
                maxH="100%"
              />
              <Text maxW={300} noOfLines={1}>
                {media.name}
                {media.ext}
              </Text>
            </HStack>
          </VStack>
        </Center>
      )
    }

    if (endpoint === 'posts' && mediaUrl && name === 'image') {
      return (
        <Caps
          imageParams={{
            title,
            text: description as string,
            image: media,
            platform: (model as Post)?.hashtag?.platform?.slug as PlatformSlug,
            ...(model as Post)?.imageParams,
          }}
        />
      )
    }

    return (
      <WImage
        bg={'gray.50'}
        src={media}
        alt={title}
        hasZoom
        objectFit="contain"
        sizes="(max-width: 480) 80vw, 33vw"
      />
    )
  }

  return (
    <Box
      maxH={{ base: 300, lg: 'full' }}
      rounded={'md'}
      pos={'relative'}
      overflow="hidden"
    >
      {renderMedia()}
      {isEditing && media && !isChangingMedia && (
        <Center
          pos="absolute"
          top={0}
          left={0}
          boxSize="full"
          bg="blackAlpha.500"
          onClick={toggleChangingMedia}
          cursor="pointer"
        >
          <Button
            leftIcon={<IoMdCloudUpload />}
            size="lg"
            colorScheme={'blackAlpha'}
          >
            {name === 'video' ? 'Change video' : 'Change image'}
          </Button>
        </Center>
      )}
    </Box>
  )
}
