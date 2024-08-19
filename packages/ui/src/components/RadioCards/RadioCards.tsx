import { FC } from 'react'

import { Option } from '../ModelSelect'

type RadioCardsProps = {
  options: Option[]
  defaultValue?: string
  setActiveOption: (value: string) => void
}

export const RadioCards: FC<RadioCardsProps> = ({
  options,
  defaultValue,
  setActiveOption,
}) => {
  return null
}
