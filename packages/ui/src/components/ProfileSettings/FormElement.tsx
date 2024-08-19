import { ReactNode } from 'react'

import { Input, Group, InputAddon, Textarea } from '@chakra-ui/react'

import { Field } from '@fc/chakra'

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
    <Field title={title} label={title}>
      <Group>
        {left && <InputAddon>{left}</InputAddon>}
        <Tag
          placeholder={placeholder}
          defaultValue={defValue}
          type={phone ? 'tel' : 'text'}
          onChange={e => onChange(e.target.value)}
          size={'lg'}
          {...(useTextarea && { resize: 'vertical' })}
        />
        {right && <InputAddon>{right}</InputAddon>}
      </Group>
    </Field>
  )
}
