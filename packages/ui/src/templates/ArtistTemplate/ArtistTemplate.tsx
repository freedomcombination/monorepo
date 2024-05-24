import { FC } from 'react'

import { SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { RecaptchaKeys } from '@fc/config'
import { useRecaptchaToken } from '@fc/services'
import { Art, Profile } from '@fc/types'

import { ArtCard, Container, Hero, WAvatar } from '../../components'

type ArtistTemplateProps = {
  artist: Profile
  arts: Art[]
  onToggleLike: () => void
}

export const ArtistTemplate: FC<ArtistTemplateProps> = ({
  artist,
  arts,
  onToggleLike,
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
        <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
          {arts?.map(art => (
            <ArtCard
              onToggleLike={onToggleLike}
              recaptchaToken={recaptchaToken}
              key={art.id}
              art={art}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
