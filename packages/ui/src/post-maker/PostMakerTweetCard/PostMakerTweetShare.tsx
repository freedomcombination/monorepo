import { FC, useEffect } from 'react'

import {
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'next-share'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'

import { useAuthContext } from '@fc/context'

import { PostSentencesModal } from './PostSentencesModal'
import { PostMakerTweetShareProps } from './types'

export const PostMakerTweetShare: FC<PostMakerTweetShareProps> = ({
  url,
  content,
}) => {
  const { roles, checkAuth } = useAuthContext()
  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Popover placement="top">
      <PopoverTrigger>
        <IconButton
          aria-label="Share post"
          colorScheme={'gray'}
          icon={<BsThreeDotsVertical />}
          variant={'ghost'}
        />
      </PopoverTrigger>
      <PopoverContent w={'max'}>
        <PopoverArrow />
        <PopoverBody>
          <HStack spacing={2}>
            <FacebookShareButton quote={content} url={url}>
              <IconButton
                as="span"
                isRound
                aria-label="share on facebook"
                icon={<FaFacebook />}
              />
            </FacebookShareButton>
            <WhatsappShareButton title={content} url={url}>
              <IconButton
                as="span"
                isRound
                variant={'outline'}
                aria-label="share on whatsapp"
                icon={<FaWhatsapp />}
              />
            </WhatsappShareButton>
            <TelegramShareButton url={url} title={content}>
              <IconButton
                as="span"
                isRound
                bg="none"
                variant={'outline'}
                aria-label="share on telegram"
                icon={<FaTelegram />}
              />
            </TelegramShareButton>
            <LinkedinShareButton url={url} title={content} about={content}>
              <IconButton
                as="span"
                isRound
                aria-label="share on linkedin"
                variant={'outline'}
                icon={<FaLinkedin />}
              />
            </LinkedinShareButton>
            {roles.includes('admin') && <PostSentencesModal />}
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
