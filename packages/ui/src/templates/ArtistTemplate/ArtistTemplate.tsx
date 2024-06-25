import { FC } from 'react'

import { Stack, Text } from '@chakra-ui/react'

import { RecaptchaKeys } from '@fc/config'
import { useRecaptchaToken } from '@fc/services'
import { Art, Profile } from '@fc/types'

import { Container, Hero, WAvatar, ArtGrid } from '../../components'

type ArtistTemplateProps = {
  artist: Profile
  arts: Art[]
  refetch: () => void
}

export const ArtistTemplate: FC<ArtistTemplateProps> = ({
  artist,
  arts,
  refetch,
}) => {
  const name = artist?.name || artist?.email
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_ART)

  return (
    <>
      <Hero>
        <Stack align="center" cursor="default" userSelect="none">
          <WAvatar size="lg" src={artist.avatar} name={name} />

          <Text color={'white'}>{name}</Text>
        </Stack>
      </Hero>
      <Container mt={'80px'}>
        <ArtGrid
          arts={arts}
          refetch={refetch}
          recaptchaToken={recaptchaToken}
        />
      </Container>
    </>
  )
}
