import { FC } from 'react'

import { Stack, Text } from '@chakra-ui/react'

import { RecaptchaKeys } from '@fc/config/constants'
import { useRecaptchaToken } from '@fc/services/common/useRecaptchaToken'
import type { Art, Profile } from '@fc/types'

import { ArtGrid } from '../ArtGrid'
import { Container } from '../Container'
import { Hero } from '../Hero'
import { WAvatar } from '../WAvatar'

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
