import { ChangeEventHandler, FC, useContext, useState } from 'react'

import { Input, Group, InputAddon } from '@chakra-ui/react'

import { DictContext } from './DictContext'
import { dicts } from './dicts'
import { EntryInputProps } from './types'

export const EntryInput: FC<EntryInputProps> = ({ locale, localeKey }) => {
  const targetDict = dicts[locale]
  const defaultVal = { ...targetDict }[localeKey]
  const value = targetDict[localeKey]

  const { locked } = useContext(DictContext)

  const [color, setColor] = useState(
    defaultVal !== value ? 'green.500' : 'gray.300',
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    // TODO: Shouldn't we avoid mutating the original object?
    // Might be better to use dict from context and update the state
    targetDict[localeKey] = e.target.value
    setColor(e.target.value !== defaultVal ? 'green.500' : 'gray.300')
  }

  return (
    <Group>
      <InputAddon size={'sm'}>{locale}</InputAddon>
      <Input
        size={'sm'}
        defaultValue={defaultVal}
        disabled={locked}
        color={color}
        _placeholder={{
          color,
        }}
        onChange={handleChange}
      />
    </Group>
  )
}
