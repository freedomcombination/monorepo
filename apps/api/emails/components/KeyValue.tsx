import React, { FC, ReactNode } from 'react'
import { getTranslate } from '../utils/getTranslate'
import { translations } from '../utils/translations'

import { Row, Section, Text, RowProps, Column } from '@react-email/components'
import { StrapiLocale } from '@fc/types'

type KeyValueProps = {
  when?: boolean
  locale: StrapiLocale
  stripped?: boolean
  divider?: boolean
  title?: ReactNode
  tKey?: keyof typeof translations
} & Omit<RowProps, 'title'>

export const KeyValue: FC<KeyValueProps> = ({
  children,
  locale = 'en',
  stripped = false,
  when = true,
  divider = true,
  title,
  tKey,
  ...props
}) => {
  const { t } = getTranslate(locale)
  if (!when) return null

  const finalTitle = tKey ? t(tKey) : title

  return (
    <Row
      style={{
        fontSize: '14px',
        gap: 4,
        padding: 1,
        ...(stripped ? { background: 'gray' } : {}),
        ...(!stripped && divider
          ? {
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
              borderBottomStyle: 'solid',
            }
          : {}),
      }}
      {...props}
    >
      <Column
        style={{
          width: '120px',
          flexShrink: 0,
          alignItems: 'flex-end',
          paddingRight: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'right',
          }}
        >
          {finalTitle}
        </Text>
      </Column>
      <Column
        style={{
          alignItems: 'flex-start',
        }}
      >
        {typeof children === 'string' ? (
          <Text style={{ textAlign: 'left' }}>{children}</Text>
        ) : (
          <Section>{children}</Section>
        )}
      </Column>
    </Row>
  )
}
