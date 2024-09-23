import { ReactNode } from 'react'

import {
  Input,
  Group,
  InputAddon,
  Textarea,
  InputElement,
} from '@chakra-ui/react'

import { Field } from '@fc/chakra'

type FormElementProps = {
  title: string
  placeholder: string
  defaultValue: string | null
  useTextarea?: boolean
  phone?: boolean
  leftAddon?: ReactNode
  rightAddon?: ReactNode
  leftElement?: ReactNode
  rightElement?: ReactNode
  onChange: (value: string) => void
}

export const FormElement: React.FC<FormElementProps> = ({
  title,
  placeholder,
  defaultValue,
  useTextarea = false,
  phone = false,
  leftAddon,
  rightAddon,
  leftElement,
  rightElement,
  onChange = () => {},
}) => {
  const defValue = defaultValue ?? ''

  const Tag = useTextarea ? Textarea : Input

  return (
    <Field title={title} label={title}>
      <Group>
        {leftAddon && <InputAddon>{leftAddon}</InputAddon>}
        {leftElement && <InputElement>{leftElement}</InputElement>}
        <Tag
          placeholder={placeholder}
          defaultValue={defValue}
          type={phone ? 'tel' : 'text'}
          onChange={e => onChange(e.target.value)}
          size={'lg'}
          {...(useTextarea && { resize: 'vertical' })}
        />
        {rightAddon && <InputAddon>{rightAddon}</InputAddon>}
        {rightElement && <InputElement>{rightElement}</InputElement>}
      </Group>
    </Field>
  )
}
