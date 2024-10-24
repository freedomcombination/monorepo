import { FC } from 'react'

import { Input, Text, Textarea, VStack } from '@chakra-ui/react'

import { InputGroup } from '@fc/chakra'

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
      <InputGroup
        startElement={
          <VStack position={'relative'} minWidth={KEY_MIN_WIDTH}>
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
        }
      >
        <Textarea
          value={defaultVal}
          disabled={locked}
          placeholder={placeholder}
          onChange={e => handleChange(e.target.value)}
        />
      </InputGroup>
    )

  return (
    <InputGroup startElement={locale}>
      <Input
        size={'sm'}
        defaultValue={defaultVal}
        disabled={locked}
        onChange={e => handleChange(e.target.value)}
      />
    </InputGroup>
  )
}
