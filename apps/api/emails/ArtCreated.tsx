import React, { FC } from 'react'

import {
  Body,
  Container,
  Heading,
  Preview,
  Section,
  Text,
  Img,
} from '@react-email/components'

import { Art } from '@fc/types'
import { TailwindThemeProvider } from './TailwindThemeProvider'

type ArtCreatedProps = {
  art: Art
}

const ArtCreated: FC<ArtCreatedProps> = ({ art }) => {
  return (
    <TailwindThemeProvider>
      <Preview>New Art Created</Preview>
      <Body>
        <Container>
          <Section>
            <Text>
              <Heading>New art created by {art.artist?.name}</Heading>
              <Text>
                {art.title_en || art.title_nl || art.title_tr} has been created
                by {art.artist?.name}
              </Text>
              <Img
                className="w-[300px]"
                src={art.image?.url}
                alt={art.title_en}
              />
            </Text>
          </Section>
        </Container>
      </Body>
    </TailwindThemeProvider>
  )
}

export default ArtCreated
