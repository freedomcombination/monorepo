import { ComponentProps, forwardRef } from 'react'

import { Box, BoxProps } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import MdEditor from 'react-markdown-editor-lite'

import 'react-markdown-editor-lite/lib/index.css'

const hiddenButtons = [
  'underline',
  'strikethrough',
  'wrap',
  'code-inline',
  'code-block',
  'table',
  'clear',
]

const hiddenButtonClasses = hiddenButtons
  .map(type => `.button-type-${type}`)
  .join(', ')

type MarkdownEditorProps = BoxProps & ComponentProps<typeof MdEditor>

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(
  function MarkdownEditor(props, ref) {
    const disabledStyles = props.disabled
      ? {
          '.rc-md-navigation': { display: 'none' },
          '.sec-md': { display: 'none' },
          '.sec-html': { border: 'none' },
          '.section-container': { p: '0 !important' },
          '.custom-html-style': {
            color: 'gray.500',
            p: 0,
            rounded: 'sm',
            '& p': { fontSize: 'md', m: 0 },
          },
          borderColor: 'transparent',
          _hover: { borderColor: 'transparent' },
          color: 'gray.500',
          userSelect: 'none',
          maxH: 350,
          overflowY: 'auto',
        }
      : {}

    return (
      <Box
        css={{
          '& .rc-md-editor': {
            ...disabledStyles,
            '&.full': {
              zIndex: 'modal',
            },
            bg: props.disabled ? 'transparent' : '#f5f5f5',
            [hiddenButtonClasses]: {
              display: 'none !important',
            },
          },
        }}
        flex={1}
      >
        <Box asChild ref={ref} h={'full'} {...props}>
          <MdEditor
            renderHTML={(text: string) => <ReactMarkdown>{text}</ReactMarkdown>}
          />
        </Box>
      </Box>
    )
  },
)

export default MarkdownEditor
