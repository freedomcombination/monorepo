import { FC } from 'react'

import { Box, Heading, Stack } from '@chakra-ui/react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6'

import { Alert } from '@fc/chakra'
import { Profile } from '@fc/types'

import { ProfileMailForm } from '../ProfileEmailForm'
import { SocialItem, SocialButtons } from '../SocialButtons'

interface ProfileContactProps {
  profile: Profile
  onSuccess?: () => void
}

export const ProfileContact: FC<ProfileContactProps> = ({
  profile,
  onSuccess,
}) => {
  if (!profile?.email) {
    return <Alert status="warning">No email address found for this user</Alert>
  }

  const phoneLink = `https://wa.me/${profile?.phone?.replace(/^\+|\s+/g, '')}`
  const facebookLink = profile?.facebook?.includes('facebook.com')
    ? profile?.facebook
    : profile?.facebook && `https://facebook.com/${profile.facebook}`
  const twitterLink =
    profile?.twitter?.includes('twitter.com') ||
    profile?.twitter?.includes('x.com')
      ? profile?.twitter
      : profile?.twitter &&
        `https://twitter.com/${profile.twitter?.replace('@', '')}`
  const linkedinLink = profile?.linkedin?.includes('linkedin.com')
    ? profile?.linkedin
    : profile?.linkedin && `https://linkedin.com/in/${profile.linkedin}`
  const instagramLink = profile?.instagram?.includes('instagram.com')
    ? profile?.instagram
    : profile?.instagram && `https://instagram.com/${profile.instagram}`

  const whatsAppItem =
    phoneLink &&
    ({
      icon: FaWhatsapp,
      label: 'WhatsApp',
      link: { en: phoneLink, tr: phoneLink, nl: phoneLink },
    } satisfies SocialItem)

  const twitterItem =
    twitterLink &&
    ({
      icon: FaXTwitter,
      label: 'Twitter',
      link: twitterLink,
    } satisfies SocialItem)

  const facebookItem =
    facebookLink &&
    ({
      icon: FaFacebook,
      label: 'Facebook',
      link: facebookLink,
    } satisfies SocialItem)

  const linkedinItem =
    linkedinLink &&
    ({
      icon: FaLinkedin,
      label: 'LinkedIn',
      link: linkedinLink,
    } satisfies SocialItem)

  const instagramItem =
    instagramLink &&
    ({
      icon: FaInstagram,
      label: 'Instagram',
      link: instagramLink,
    } satisfies SocialItem)

  const socialItems = [
    whatsAppItem,
    twitterItem,
    facebookItem,
    linkedinItem,
    instagramItem,
  ].filter(Boolean) as SocialItem[]

  return (
    <Stack p={{ base: 4, lg: 8 }} gap={4}>
      <Heading as="h2">User Contact</Heading>
      <SocialButtons
        items={socialItems}
        borderColor={'primary.500'}
        color={'primary.500'}
        _hover={{
          borderColor: 'primary.400',
          color: 'primary.400',
        }}
      />
      <Box>
        <ProfileMailForm
          email={profile?.email as string}
          profileId={profile?.id}
          onSuccess={onSuccess}
        />
      </Box>
    </Stack>
  )
}
