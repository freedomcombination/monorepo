import React, { FC, PropsWithChildren } from 'react'

import { Column, Heading, Img, Row, Section } from '@react-email/components'

import { Site } from '@fc/types'

import { getSiteColor, getSiteLogo, getSiteName } from '../utils/getSiteData'

type SiteLayoutProps = PropsWithChildren<{
  site: Site
  preview?: string
}>

const SiteLayout: FC<SiteLayoutProps> = ({ site, children, preview }) => {
  const bgColor = getSiteColor(site)

  return (
    <Section
      className="rounded py-6"
      style={{
        borderWidth: '2px',
        borderColor: bgColor,
        borderStyle: 'solid',
      }}
    >
      <Row>
        <Img
          className="pb-4 w-[120px] h-[120px] mx-auto"
          src={getSiteLogo(site)}
          alt={getSiteName(site)}
        />
      </Row>
      <Row style={{ backgroundColor: bgColor }}>
        <Column>
          <Heading className="text-2xl py-4 text-center font-bold text-white">
            {preview || getSiteName(site)}
          </Heading>
        </Column>
      </Row>

      <Section className="p-6">{children}</Section>
    </Section>
  )
}

export default SiteLayout
