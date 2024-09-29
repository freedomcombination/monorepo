import { useState, useEffect } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Spinner,
} from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import { upperFirst } from 'lodash'
import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Block } from '@fc/types'
import { parseHtmlToBlocks } from '@fc/utils/parseHtmlToBlocks'
import { renderToHtml } from '@fc/utils/renderToHtml'

import { editableInit, init, nonEditableInit } from './init'
import { I18nNamespaces } from '../../@types/i18next'
import { FormItemProps } from '../FormItem'

import './style.css'

type BlockFormItemProps<T extends FieldValues> = {
  setValue: (name: string, value: Block[]) => void
  initialContent: Block[]
  isEditing: boolean
  name: string
} & Omit<FormItemProps<T>, 'register' | 'leftElement'>

export const BlockFormItem = <T extends FieldValues>({
  name,
  label: initialLabel,
  initialContent,
  isEditing,
  setValue,
  helperText,
  errors,
  ...rest
}: BlockFormItemProps<T>) => {
  const { t } = useTranslation()
  const htmlContent = renderToHtml(initialContent)
  const [content, setContent] = useState<string | undefined>(htmlContent ?? '')
  const [editorKey, setEditorKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const translatedName = t(name as keyof I18nNamespaces['common'])
  const label = initialLabel || translatedName || name
  const errorMessage = errors?.[name]?.['message'] as unknown as string

  const [edit, setEdit] = useState<init>(nonEditableInit)

  const handleEditorChange = (newContent: string) => {
    if (newContent == null) {
      console.error('new content is null')

      return
    }
    const parsedBlock = parseHtmlToBlocks(newContent)
    setContent(newContent ?? '')
    setValue(name, parsedBlock)
  }

  useEffect(() => {
    setEdit(isEditing ? editableInit : nonEditableInit)
    setEditorKey(prevKey => prevKey + 1)
  }, [isEditing])

  if (content === undefined || content === null) {
    console.error(
      'BlockFormItem: Content is undefined or null, please check the model data',
    )

    return null
  }

  return (
    <FormControl>
      {label && (
        <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight={600}>
          {label}
        </FormLabel>
      )}
      {isLoading && <Spinner />}
      <Editor
        key={editorKey}
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        value={content}
        init={edit}
        onEditorChange={handleEditorChange}
        onError={(error: any) => console.error('Editor Error:', error)}
        onInit={() => setIsLoading(false)}
        {...rest}
      />
      <FormErrorMessage data-testid={`error-text-${name}`}>
        {errorMessage && upperFirst(errorMessage)}
      </FormErrorMessage>
      {helperText && (
        <FormHelperText color="orange.400">{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
