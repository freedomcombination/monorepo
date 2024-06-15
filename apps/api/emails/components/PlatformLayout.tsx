import { Site } from '@fc/types'
import {
  Column,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import React from 'react'
import { FC, PropsWithChildren } from 'react'
import { getSiteColor, getSiteLogo, getSiteName } from '../utils/getSiteData'

type PlatformLayoutProps = PropsWithChildren<{
  site: Site
  preview?: string
}>

const PlatformLayout: FC<PlatformLayoutProps> = ({
  site,
  children,
  preview,
}) => {
  const bgColor = getSiteColor(site)

  return (
    <Section>
      <Row
        style={{
          backgroundColor: bgColor,
        }}
      >
        <Column
          style={{
            width: '40%',
          }}
        >
          <Img
            style={{
              width: '120px',
              height: '120px',
            }}
            src={getSiteLogo(site)}
            alt={getSiteName(site)}
          />
        </Column>
        <Column
          style={{
            width: '60%',
          }}
        >
          {preview ? (
            <Preview>{preview}</Preview>
          ) : (
            <Text>{getSiteName(site)}</Text>
          )}
        </Column>
      </Row>
      <Row>{children}</Row>
      <Row>
        <Column
          style={{
            width: '100%',
            height: 40,
            backgroundColor: bgColor,
          }}
        >
          {
            // TODO add footer
            ' '
          }
        </Column>
      </Row>
    </Section>
  )
}

export default PlatformLayout
