import { ReactNode } from 'react'

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
} from '@chakra-ui/react'

type FormElementProps = {
  title: string
  placeholder: string
  defaultValue: string | null
  useTextarea?: boolean
  phone?: boolean
  left?: ReactNode
  right?: ReactNode
  onChange: (value: string) => void
}

export const FormElement: React.FC<FormElementProps> = ({
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

  const Tag = useTextarea ? Textarea : Input

  return (
    <FormControl title={title}>
      <FormLabel fontWeight={600}>{title}</FormLabel>
      <InputGroup size={'lg'}>
        {left && <InputLeftAddon>{left}</InputLeftAddon>}
        <Tag
          placeholder={placeholder}
          defaultValue={defValue}
          type={phone ? 'tel' : 'text'}
          onChange={e => onChange(e.target.value)}
          {...(useTextarea && { resize: 'vertical' })}
        />
        {right && <InputRightAddon>{right}</InputRightAddon>}
      </InputGroup>
    </FormControl>
  )
}
