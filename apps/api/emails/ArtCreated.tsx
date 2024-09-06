import React, { FC } from 'react'

import { Heading, Img, Preview, Section, Text } from '@react-email/components'

import { Art } from '@fc/types'
import { EmailProvider } from './EmailProvider'

type ArtCreatedProps = {
  art?: Art
}

const ArtCreated: FC<ArtCreatedProps> = ({
  art = {
    // if we gave default values we can easily see the design of mail from the preview
    artist: { name: 'artist name' },
    title_en: 'art title',
    title_nl: 'art title',
    title_tr: 'art title',
    image: [{ url: 'http://picsum.photos/200/300' }],
  } as Art,
}) => {
  const image = art?.image?.[0]

  return (
    <EmailProvider>
      <Preview>New Art Created</Preview>
      <Section>
        <Heading>New art created by {art.artist?.name}</Heading>
        <Text>
          {art.title_en || art.title_nl || art.title_tr} has been created by{' '}
          {art.artist?.name}
        </Text>
        <Img
          style={{ width: '300px' }}
          src={image?.formats?.small?.url || image?.url}
          alt={art.title_en}
        />
      </Section>
    </EmailProvider>
  )
}

export default ArtCreated
