import { FC, useState } from 'react'

import { useDisclosure, useUpdateEffect } from '@chakra-ui/hooks'
import { Button, Stack } from '@chakra-ui/react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { useRouter } from 'next/router'
import { FaDownload } from 'react-icons/fa'

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@fc/chakra'
import { SITE_URL } from '@fc/config'
import { useStrapiRequest } from '@fc/services'
import { PlatformSlug, Post } from '@fc/types'
import { getMediaUrl, getOgImageSrc } from '@fc/utils'

import { Caps } from '../Caps'
import { WImage } from '../WImage'

type DownloadCapsModalType = {
  id: number
}

export const DownloadCapsModal: FC<DownloadCapsModalType> = ({ id }) => {
  const { open, onOpen, onClose, onToggle } = useDisclosure()
  const [loading, setLoading] = useState(false)

  const { locale } = useRouter()

  const postsQuery = useStrapiRequest<Post>({
    endpoint: 'posts',
    filters: {
      ...(id && { hashtag: { id: { $eq: id } } }),
      approvalStatus: { $eq: 'approved' },
    },
    locale,
    includeDrafts: true,
  })

  const postMedias =
    postsQuery?.data?.data
      ?.map(post => {
        const imageSrc = getMediaUrl(post?.image)
        const title = post?.title
        const text = post?.description || undefined
        const capsSrc = getMediaUrl(post?.caps)
        const imageParams = post.imageParams && {
          ...post.imageParams,
          image: imageSrc,
          title,
          text,
          scale: 1.5,
          platform: (post?.hashtag?.platform?.slug ??
            'trend-rights') as PlatformSlug,
        }
        const autoCapsPath = imageParams && getOgImageSrc(imageParams)
        const autoCapsSrc =
          autoCapsPath && SITE_URL + getOgImageSrc(imageParams)

        return {
          imageSrc,
          capsSrc,
          autoCapsSrc,
          autoCapsPath,
          imageParams,
          title,
          text,
        }
      })
      .filter(Boolean) || []

  useUpdateEffect(() => {
    postsQuery.refetch()
  }, [id])

  const onDownload = async () => {
    setLoading(true)
    const zip = new JSZip()
    const imgFolder = zip.folder('hashtag-images')

    await Promise.all(
      postMedias.map(async (media, index) => {
        if (!media.capsSrc && !media.autoCapsSrc && !media.imageSrc) return

        const imageSrc = media.capsSrc || media.autoCapsPath || media.imageSrc

        try {
          const response = await fetch(imageSrc as string)
          const blob = response && (await response.blob())

          if (!blob) return

          if (!blob.size) return

          imgFolder?.file(`${locale}_image_${index}.jpeg`, blob)
        } catch (error) {
          console.error('Download caps error', error)
        }
      }),
    )

    const allImages = await zip.generateAsync({ type: 'blob' })

    saveAs(allImages, `hashtag-images_${locale}.zip`)
    setLoading(false)
  }

  return (
    <>
      <Button onClick={onOpen}>Download Caps</Button>
      <Drawer open={open} placement="end" onOpenChange={onToggle}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Download Caps</DrawerHeader>
          <DrawerBody>
            <Stack>
              {postMedias.map((media, index) => {
                if (media.capsSrc) {
                  return (
                    <WImage
                      key={index}
                      h={48}
                      src={media.capsSrc}
                      alt={'image'}
                    />
                  )
                }

                if (media.imageParams) {
                  return (
                    <Caps
                      key={index}
                      h={48}
                      imageParams={{
                        ...media.imageParams,
                        image: media.imageSrc,
                        title: media.title,
                        text: media.text,
                      }}
                    />
                  )
                }

                if (media.imageSrc) {
                  return (
                    <WImage
                      key={index}
                      h={48}
                      src={media.imageSrc}
                      alt={'image'}
                    />
                  )
                }
              })}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              colorScheme={'gray'}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              leftIcon={<FaDownload />}
              w={'full'}
              onClick={onDownload}
              colorScheme={'primary'}
              loading={loading}
            >
              Download Caps
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
