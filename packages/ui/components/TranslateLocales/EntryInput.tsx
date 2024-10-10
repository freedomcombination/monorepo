import { FC } from 'react'

import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'

const INPUT_AREA_LENGTH_LIMIT = 50
const KEY_MIN_WIDTH = '50px'

type EntryInputProps = {
  locale: string
  defaultVal: string
  locked?: boolean
  placeholder?: string
  handleChange: (val: string) => void
}

export const EntryInput: FC<EntryInputProps> = ({
  locale,
  defaultVal,
  placeholder,
  locked = false,
  handleChange,
}) => {
  const length = defaultVal.length

  if (length > INPUT_AREA_LENGTH_LIMIT)
    return (
      <InputGroup size={'sm'}>
        <InputLeftAddon position={'relative'} minWidth={KEY_MIN_WIDTH}>
          <VStack>
            <Text>{locale}</Text>
            <Text
              position={'absolute'}
              right={1}
              bottom={-6}
              fontWeight={'bold'}
              fontSize={'sm'}
            >
              {length}
            </Text>
          </VStack>
        </InputLeftAddon>
        <Textarea
          value={defaultVal}
          isDisabled={locked}
          placeholder={placeholder}
          onChange={e => handleChange(e.target.value)}
        />
      </InputGroup>
    )

  return (
    <InputGroup size={'sm'}>
      <InputLeftAddon minWidth={KEY_MIN_WIDTH}>{locale}</InputLeftAddon>
      <Input
        value={defaultVal}
        isDisabled={locked}
        placeholder={placeholder}
        onChange={e => handleChange(e.target.value)}
      />
    </InputGroup>
  )
}
