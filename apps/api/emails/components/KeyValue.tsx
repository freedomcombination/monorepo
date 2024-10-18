import React, { FC, ReactNode } from 'react'

import { Column, Row, RowProps, Section, Text } from '@react-email/components'

type KeyValueProps = {
  when?: boolean
  stripped?: boolean
  divider?: boolean
  title?: ReactNode
} & Omit<RowProps, 'title'>

export const KeyValue: FC<KeyValueProps> = ({
  children,
  stripped = false,
  when = true,
  divider = true,
  title,
  ...props
}) => {
  if (!when) return null

  return (
    <Row
      style={{
        fontSize: '14px',
        display: 'flex',
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
          width: '80px',
          minWidth: '80px',
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
          {title}
        </Text>
      </Column>
      <Column
        style={{
          alignItems: 'flex-start',
          flexGrow: 1,
          flexShrink: 1,
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
