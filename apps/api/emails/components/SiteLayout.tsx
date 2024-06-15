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
        <Column className="w-1/3">
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
        <Column className="w-2/3">
          <Text className="text-lg font-bold text-white">
            {preview || getSiteName(site)}
          </Text>
        </Column>
      </Row>
      <Row className="py-4">{children}</Row>
      <Row>
        <Column className="w-full h-8" style={{ backgroundColor: bgColor }}>
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
