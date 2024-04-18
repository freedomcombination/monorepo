import { FC, FormEventHandler, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { useDebounce } from 'react-use'

import { ContentEditableProps } from './types'

export const ContentEditable: FC<ContentEditableProps> = props => {
  const {
    value,
    onUpdate,
    threshold,
    thresholdStyles = {},
    contentEditable = true,
    children,
    ...rest
  } = props

  const [currentValue, setCurrentValue] = useState<string>(value)

  const contentRef = useRef<HTMLDivElement>(null)
  const caretPos = useRef<number>(0)

  useDebounce(
    () => {
      if (contentEditable) onUpdate(currentValue)
    },
    700,
    [currentValue],
  )

  const getCaret = (el: HTMLDivElement) => {
    let caretAt = 0
    const selection = window.getSelection()

    if (!selection) return 0

    if (selection.rangeCount === 0) {
      return caretAt
    }

    const range = selection.getRangeAt(0)
    const preRange = range.cloneRange()
    preRange.selectNodeContents(el)
    preRange.setEnd(range.endContainer, range.endOffset)
    caretAt = preRange.toString().length

    return caretAt
  }

  /**
  function setCaret(el: HTMLDivElement, offset: number) {
    const sel = window.getSelection()
    const range = document.createRange()

    if (el.childNodes.length && sel) {
      range.setStart(el.childNodes[0], offset)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }
  */

  const handleInput: FormEventHandler<HTMLDivElement> = e => {
    const target = (e.target || e.currentTarget) as HTMLDivElement
    const content = target?.textContent ?? ''

    setCurrentValue(content)

    if (contentRef.current) {
      caretPos.current = getCaret(contentRef.current) as number
    }
  }

  const validValue = threshold
    ? currentValue?.slice(0, threshold)
    : currentValue
  const thresholdValue = threshold ? currentValue?.slice(threshold ?? 0) : null

  return (
    <Box pos={'relative'} {...rest}>
      {thresholdValue && (
        <Box p={2} pos={'absolute'} top={0} left={0} boxSize={'full'}>
          {validValue}
          <Box as={'span'} color={'red'} {...thresholdStyles}>
            {thresholdValue}
          </Box>
        </Box>
      )}
      <Box
        pos={'relative'}
        display={'inline-block'}
        {...(thresholdValue && {
          bg: 'transparent',
          sx: {
            WebkitTextFillColor: 'transparent',
          },
        })}
        p={2}
        ref={contentRef}
        _focusVisible={{
          outline: 'none',
        }}
        suppressContentEditableWarning
        contentEditable={contentEditable}
        onInput={handleInput}
      >
        {value}
      </Box>
      {children}
    </Box>
  )
}
