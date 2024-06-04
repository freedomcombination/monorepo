import { FC } from 'react'

import { Box, Stack, Heading } from '@chakra-ui/react'
// import { FaWhatsapp } from 'react-icons/fa6'

import { useStrapiRequest } from '@fc/services'
import { Profile } from '@fc/types'

// import { SocialButtons } from '../../components'
import { ProfileMailForm } from '../ProfileEmailForm'

interface ProfileContactProps {
  id: number
}

export const ProfileContact: FC<ProfileContactProps> = ({ id }) => {
  const profileQuery = useStrapiRequest<Profile>({
    endpoint: 'profiles',
    id,
  })

  const profile = profileQuery.data?.data

  if (!profile) {
    console.error('Profile  is undefined')

    return ''
  }
  // const phoneNumber = profile?.phone?.replace(/^\+|\s+/g, '')
  // const whatsappLink = [
  //   {
  //     label: 'WhatsApp',
  //     icon: FaWhatsapp,
  //     link: {
  //       en: `https://api.whatsapp.com/send?phone=${phoneNumber}`,
  //       tr: `https://api.whatsapp.com/send?phone=${phoneNumber}`,
  //       nl: `https://api.whatsapp.com/send?phone=${phoneNumber}`,
  //     },
  //   },
  // ]

  return (
    <Stack p={{ base: 4, lg: 8 }} spacing={4}>
      <Heading as="h2">Send Email to User</Heading>
      {/* <SocialButtons items={whatsappLink} /> */}
      <Box>
        <ProfileMailForm email={profile?.email as string} />
      </Box>
    </Stack>
  )
}
