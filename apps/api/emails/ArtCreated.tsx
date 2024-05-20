import React, { FC } from 'react'

import { Heading, Img, Preview, Section, Text } from '@react-email/components'

import { Art } from '@fc/types'
import { EmailProvider } from './EmailProvider'

type ArtCreatedProps = {
  art: Art
}

const ArtCreated: FC<ArtCreatedProps> = ({ art }) => {
  return (
    <EmailProvider>
      <Preview>New Art Created</Preview>
      <Section>
        <Heading>New art created by {art.artist?.name}</Heading>
        <Text>
          {art.title_en || art.title_nl || art.title_tr} has been created by{' '}
          {art.artist?.name}
        </Text>
        <Img className="w-[300px]" src={art.image?.url} alt={art.title_en} />
      </Section>
    </EmailProvider>
  )
}

export default ArtCreated
