import React, { FC } from 'react'

import { Button, ButtonProps } from '@react-email/components'

export const EmailButton: FC<ButtonProps> = props => {
  return (
    <Button
      className="bg-blue-500 inline-flex px-4 py-3 rounded text-white font-semibold"
      {...props}
    />
  )
}
