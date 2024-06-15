import { AppSlug } from '@fc/types'
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
import {
  getColorByAppSlug,
  getLogoByAppSlug,
  getNameByAppSlug,
} from '../utils/getByAppSlug'

type PlatformLayoutProps = PropsWithChildren<{
  appSlug: AppSlug
  preview?: string
}>

const PlatformLayout: FC<PlatformLayoutProps> = ({
  appSlug,
  children,
  preview,
}) => {
  const bgColor = getColorByAppSlug(appSlug)

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
            src={getLogoByAppSlug(appSlug)}
            alt={getNameByAppSlug(appSlug)}
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
            <Text>{getNameByAppSlug(appSlug)}</Text>
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
