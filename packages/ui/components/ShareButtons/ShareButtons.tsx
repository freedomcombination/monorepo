import { FC, PropsWithChildren } from 'react'

import {
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
  Link,
} from '@chakra-ui/react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'next-share'
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { makeSocialContent } from '@fc/utils/makeSocialContent'

type ShareButtonsProps = ButtonGroupProps & {
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
    <ButtonGroup variant="outline" size={size} alignItems="center" {...rest}>
      {children}
      <FacebookShareButton quote={content} url={url}>
        <IconButton
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
    </ButtonGroup>
  )
}
