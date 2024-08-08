import { ReactNode } from 'react'

import { Textarea } from '@chakra-ui/react'

import { FormControl, FormLabel } from '../Form'
import { Input, InputGroup, InputLeftAddon, InputRightAddon } from '../Input'

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

  const Component = useTextarea ? Textarea : Input

  return (
    <FormControl title={title}>
      <FormLabel fontWeight={600}>{title}</FormLabel>
      <InputGroup size={'lg'}>
        {left && <InputLeftAddon>{left}</InputLeftAddon>}
        <Component
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
