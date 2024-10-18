import type { Site } from '@fc/types'
import {
  Column,
  Container,
  Heading,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components'
import React, { FC, PropsWithChildren } from 'react'
import { getSiteColor, getSiteLogo, getSiteName } from '../utils/getSiteData'

type SiteLayoutProps = PropsWithChildren<{
  site: Site
  preview?: string
  heading?: string
}>

const SiteLayout: FC<SiteLayoutProps> = ({
  site,
  children,
  preview,
  heading,
}) => {
  const bgColor = getSiteColor(site)

  return (
    <Section>
      <Row style={{ backgroundColor: bgColor }}>
        <Column style={{ width: '250px' }}>
          <Img
            style={{
              width: '120px',
              height: '120px',
              padding: '20px',
            }}
            src={getSiteLogo(site)}
            alt={getSiteName(site)}
          />
        </Column>
        <Column style={{ width: '100%' }}>
          <Text
            style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}
          >
            {preview || getSiteName(site)}
          </Text>
        </Column>
      </Row>
      <Container style={{ marginTop: 24, marginBottom: 24 }}>
        <Section>
          <Heading>{heading}</Heading>
        </Section>
        <Section style={{ padding: 10 }}>{children}</Section>
      </Container>
      <Row>
        <Column style={{ width: '100%', height: 64, backgroundColor: bgColor }}>
          {
            // TODO add footer
            ' '
          }
        </Column>
      </Row>
    </Section>
  )
}

export default SiteLayout
