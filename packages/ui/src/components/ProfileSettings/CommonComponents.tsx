import { FC, PropsWithChildren, ReactNode } from 'react'

import {
  Stack,
  Text,
  Box,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react'

type SingleLineProps = PropsWithChildren<{
  title: string
}>
export const SingleLine: FC<SingleLineProps> = ({ title, children }) => {
  return (
    <Stack gap={4}>
      <Text fontWeight={'semibold'}>{title}</Text>
      <Box ml={4}>{children}</Box>
    </Stack>
  )
}

type MultiLineProps = PropsWithChildren<{
  buttons?: ReactNode
}>
export const MultiLine: FC<MultiLineProps> = ({ buttons, children }) => {
  return (
    <Stack gap={8} mr={4}>
      <Stack gap={6} divider={<Divider />}>
        {children}
      </Stack>
      {buttons && (
        <HStack gap={4} justifyItems={'end'}>
          {buttons}
        </HStack>
      )}
    </Stack>
  )
}

type SingleDetailProps = {
  title: string
  placeholder: string
  defaultValue: string | null
  useTextarea?: boolean
  phone?: boolean
  left?: ReactNode
  right?: ReactNode
  onChange: (value: string) => void
}

export const SingleDetail: React.FC<SingleDetailProps> = ({
  title,
  placeholder,
  defaultValue,
  useTextarea = false,
  phone = false,
  left,
  right,
  onChange = () => {},
}) => {
  const defValue = defaultValue ?? ''

  return (
    <SingleLine title={title}>
      {useTextarea ? (
        <Textarea
          ml={4}
          placeholder={placeholder}
          defaultValue={defValue}
          resize={'vertical'}
          size="lg"
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <InputGroup size={'lg'} ml={4}>
          {left && <InputLeftAddon>{left}</InputLeftAddon>}
          <Input
            placeholder={placeholder}
            defaultValue={defValue}
            type={phone ? 'tel' : 'text'}
            onChange={e => onChange(e.target.value)}
          />
          {right && <InputRightAddon>{right}</InputRightAddon>}
        </InputGroup>
      )}
    </SingleLine>
  )
}
