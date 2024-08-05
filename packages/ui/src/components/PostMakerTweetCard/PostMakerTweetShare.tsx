import { FC } from 'react'

import { HStack } from '@chakra-ui/react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'next-share'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'

import { PostSentenceReference } from './PostSentenceReference'
import { PostSentencesModal } from './PostSentencesModal'
import { PostMakerTweetShareProps } from './types'
import { IconButton } from '../IconButton'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '../Popover'

export const PostMakerTweetShare: FC<PostMakerTweetShareProps> = ({
  url,
  content,
}) => {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <IconButton
          aria-label="Share post"
          colorPalette={'gray'}
          icon={<BsThreeDotsVertical />}
          variant={'ghost'}
        />
      </PopoverTrigger>
      <PopoverContent w={'max'}>
        <PopoverArrow />
        <PopoverBody>
          <HStack gap={2}>
            <FacebookShareButton quote={content} url={url}>
              <IconButton
                as="span"
                rounded={'full'}
                aria-label="share on facebook"
                icon={<FaFacebook />}
              />
            </FacebookShareButton>
            <WhatsappShareButton title={content} url={url}>
              <IconButton
                as="span"
                rounded={'full'}
                variant={'outline'}
                aria-label="share on whatsapp"
                icon={<FaWhatsapp />}
              />
            </WhatsappShareButton>
            <TelegramShareButton url={url} title={content}>
              <IconButton
                as="span"
                rounded={'full'}
                bg="none"
                variant={'outline'}
                aria-label="share on telegram"
                icon={<FaTelegram />}
              />
            </TelegramShareButton>
            <LinkedinShareButton url={url} title={content} about={content}>
              <IconButton
                as="span"
                rounded={'full'}
                aria-label="share on linkedin"
                variant={'outline'}
                icon={<FaLinkedin />}
              />
            </LinkedinShareButton>
            <PostSentenceReference />
            <PostSentencesModal />
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
