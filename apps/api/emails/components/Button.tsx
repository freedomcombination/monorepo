import { Button, ButtonProps } from '@react-email/components'
import React, { FC } from 'react'

export const EmailButton: FC<ButtonProps> = ({ style, ...props }) => {
  return (
    <Button
      style={{
        backgroundColor: '#3b82f6', // Equivalent of bg-blue-500
        display: 'inline-flex',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: '0.375rem', // Equivalent of rounded
        color: 'white',
        fontWeight: 600,
        ...(style || {}),
      }}
      {...props}
    />
  )
}
