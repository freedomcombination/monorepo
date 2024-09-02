import { Site } from '@fc/types'
import { Column, Img, Row, Section, Text } from '@react-email/components'
import React, { FC, PropsWithChildren } from 'react'
import { getSiteColor, getSiteLogo, getSiteName } from '../utils/getSiteData'

type SiteLayoutProps = PropsWithChildren<{
  site: Site
  preview?: string
}>

const SiteLayout: FC<SiteLayoutProps> = ({ site, children, preview }) => {
  const bgColor = getSiteColor(site)

  return (
    <Section>
      <Row style={{ backgroundColor: bgColor }}>
        <Column style={{ width: '33.333333%' }}>
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
        <Column style={{ width: '66.666667%' }}>
          <Text
            style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}
          >
            {preview || getSiteName(site)}
          </Text>
        </Column>
      </Row>
      <Row style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        {children}
      </Row>
      <Row>
        <Column
          style={{ width: '100%', height: '32px', backgroundColor: bgColor }}
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

export default SiteLayout
