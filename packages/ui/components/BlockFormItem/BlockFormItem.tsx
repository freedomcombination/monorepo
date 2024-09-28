import { useState, useEffect } from 'react'

import { Modal, Stack, ModalContent, Portal } from '@chakra-ui/react'
import { Editor } from '@tinymce/tinymce-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Control, FieldValues, useController } from 'react-hook-form'

import { I18nNamespaces } from '../../@types/i18next'
import { FormItemProps } from '../FormItem'
import './style.css'

type BlockFormItemProps<T extends FieldValues> = {
  control: Control<T>
} & Omit<FormItemProps<T>, 'register' | 'leftElement'>

export const BlockFormItem = <T extends FieldValues>({
  control,
  name,
  model,
  ...rest
}: BlockFormItemProps<T>) => {
  const {
    field: { onChange, value, ...fieldProps },
  } = useController<T>({ name, control })

  const { t } = useTranslation()

  const initialContent = model?.[name] || ''
  const htmlContent = renderToHtml(initialContent)
  // console.log('about ..................', initialContent)
  const [content, setContent] = useState<string>(htmlContent ?? '')

  //   useEffect(() => {
  //     setContent(model?.[`about_${locale}`] || '')
  //   }, [locale, model])

  const handleEditorChange = (newContent: string) => {
    if (newContent == null) {
      console.error('new content is null')

      return
    }
    console.log('new content', newContent)
    setContent(newContent ?? '')
    onChange(newContent ?? '')
  }
  //   console.log('initial content', content)

  //   console.log('html content', htmlContent)
  const handleEditorError = (error: any) => {
    if (error == null) {
      console.error('Editor Error is null')

      return
    }
    console.error('Editor Error:', error)
  }

  if (content === undefined || content === null) {
    console.error(
      'BlockFormItem: Content is undefined or null, please check the model data',
    )

    return null
  }

  return (
    <Stack>
      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        value={content}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink blocsformat formatselect lists link image charmap print preview anchor table',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo |blocksformat | formatselect | bold italic backcolor | table |' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | ' +
            'removeformat | help',
        }}
        onEditorChange={handleEditorChange}
      />
    </Stack>
  )
}

export const renderToHtml = (blocks: any) => {
  if (!blocks) return ''

  return Object.values(blocks)
    .filter(block => block !== null && block !== undefined)
    .map(block => {
      switch (block?.type) {
        case 'paragraph':
          return `<p>${block?.children
            ?.filter(child => child?.text !== null && child?.text !== undefined)
            .map(child => child.text)
            .join('')}</p>`
        case 'heading':
          return `<h${block?.level}>${block?.children
            ?.filter(child => child?.text !== null && child?.text !== undefined)
            .map(child => child.text)
            .join('')}</h${block?.level}>`
        case 'list':
          return block?.format === 'ordered'
            ? `<ol>${block?.children
                ?.filter(
                  item => item?.text !== null && item?.text !== undefined,
                )
                .map(item => `<li>${item.text}</li>`)
                .join('')}</ol>`
            : `<ul>${block?.children
                ?.filter(
                  item => item?.text !== null && item?.text !== undefined,
                )
                .map(item => `<li>${item.text}</li>`)
                .join('')}</ul>`
        case 'link':
          return `<a href="${block?.url}">${block?.children
            ?.filter(child => child?.text !== null && child?.text !== undefined)
            .map(child => child.text)
            .join('')}</a>`
        default:
          return ''
      }
    })
    .join('')
}
