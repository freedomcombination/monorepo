import { FC, PropsWithChildren } from 'react'

import { Link } from '@chakra-ui/next-js'
import { Group, GroupProps } from '@chakra-ui/react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'next-share'
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { IconButton } from '@fc/chakra'
import { makeSocialContent } from '@fc/utils'

type ShareButtonsProps = GroupProps & {
  title?: string
  url: string
  quote: string
}

export const ShareButtons: FC<PropsWithChildren<ShareButtonsProps>> = ({
  title,
  url,
  quote,
  size = 'sm',
  children,
  ...rest
}) => {
  const { twitterContent, content } = makeSocialContent(quote, title)

  const baseUrl = 'https://x.com/intent/tweet'
  const params = {
    url,
    text: `${twitterContent}\n\n`,
  }
  const query = new URLSearchParams(params)
  const result = query.toString()

  const postUrl = `${baseUrl}?${result.toString()}`

  return (
    <Group alignItems="center" {...rest}>
      {children}
      <FacebookShareButton quote={content} url={url}>
        <IconButton
          variant="outline"
          size={size}
          as="span"
          isRound
          aria-label="share on faceobok"
          _hover={{
            bg: 'facebook.500',
            borderColor: 'facebook.500',
            color: 'white',
          }}
          icon={<FaFacebook />}
        />
      </FacebookShareButton>
      <Link href={postUrl} isExternal>
        <IconButton
          variant="outline"
          size={size}
          as="span"
          isRound
          _hover={{ bg: 'black', borderColor: 'black', color: 'white' }}
          aria-label="share on X"
          icon={<FaXTwitter />}
        />
      </Link>
      <WhatsappShareButton title={content} url={url}>
        <IconButton
          as="span"
          variant="outline"
          size={size}
          isRound
          _hover={{
            bg: 'whatsapp.500',
            borderColor: 'whatsapp.500',
            color: 'white',
          }}
          aria-label="share on whatsapp"
          icon={<FaWhatsapp />}
        />
      </WhatsappShareButton>
      <TelegramShareButton url={url} title={content}>
        <IconButton
          as="span"
          variant="outline"
          size={size}
          isRound
          _hover={{
            bg: 'telegram.500',
            borderColor: 'telegram.500',
            color: 'white',
          }}
          aria-label="share on telegram"
          icon={<FaTelegram />}
        />
      </TelegramShareButton>
      <LinkedinShareButton url={url} title={content} about={content}>
        <IconButton
          as="span"
          variant="outline"
          size={size}
          isRound
          _hover={{
            bg: 'linkedin.500',
            borderColor: 'linkedin.500',
            color: 'white',
          }}
          aria-label="share on linkedin"
          icon={<FaLinkedin />}
        />
      </LinkedinShareButton>
    </Group>
  )
}
