import React, { FC } from 'react'

import { HStack, useRadioGroup } from '@chakra-ui/react'

import { RadioCard } from './RadioCard'
import { Option } from '../ModelForm'

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
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue,
    onChange: value => setActiveOption(value),
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map(option => {
        const radio = getRadioProps({ value: option.value })

        return (
          <RadioCard key={option.value} {...radio}>
            {option.label}
          </RadioCard>
        )
      })}
    </HStack>
  )
}
