import { Badge, ButtonProps, HStack } from '@chakra-ui/react'
import { FaInfo, FaX } from 'react-icons/fa6'

import { IconButton, Popover, PopoverContent, PopoverTrigger } from '@fc/chakra'
import { OgImageParams } from '@fc/types'

import { Caps } from '../Caps'
import { ContentEditable, ContentEditableProps } from '../ContentEditable'

export type EditableProps = ContentEditableProps & {
  disabled?: boolean
  onDelete?: () => void
  isDescription?: boolean
  imageParams?: OgImageParams
  colorPalette?: ButtonProps['colorPalette']
}

export const EditableLine: React.FC<EditableProps> = ({
  onDelete,
  isDescription = false,
  contentEditable = true,
  disabled: initialDisabled = false,
  imageParams = {},
  value,
  colorPalette = 'primary',
  threshold,
  ...rest
}) => {
  const disabled = initialDisabled || !contentEditable

  return (
    <HStack
      pos={'relative'}
      px={2}
      align={'start'}
      rounded={'md'}
      pl={isDescription ? 0 : 4}
      role={'group'}
    >
      <IconButton
        mt={2}
        disabled={disabled}
        aria-label="delete"
        variant={'ghost'}
        colorPalette="red"
        size={'xs'}
        icon={<FaX />}
        onClick={onDelete}
        rounded={'full'}
      />
      {isDescription && (
        <Popover lazyMount positioning={{ placement: 'bottom-start' }}>
          <PopoverTrigger>
            <IconButton
              mt={2}
              variant={'outline'}
              size="xs"
              aria-label={'Show caps'}
              icon={<FaInfo />}
              colorPalette="blue"
              rounded={'full'}
            />
          </PopoverTrigger>
          <PopoverContent
            width={{ base: 200, lg: 650 }}
            p={0}
            m={0}
            background={'white'}
            borderRadius={'md'}
            overflow={'hidden'}
          >
            <Caps
              m={0}
              p={0}
              width={{ base: 200, lg: 650 }}
              imageParams={{
                text: value as string,
                scale: 1,
                ...imageParams,
              }}
            />
          </PopoverContent>
        </Popover>
      )}
      <ContentEditable
        _hover={{
          bg: 'whiteAlpha.300',
        }}
        _focusWithin={{
          bg: 'whiteAlpha.500',
        }}
        value={value}
        contentEditable={!disabled}
        threshold={threshold}
        {...rest}
      >
        <Badge
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          _groupFocusWithin={{
            opacity: 1,
          }}
          transition={'opacity 0.3s ease-in-out'}
          colorPalette={
            threshold && value?.length > threshold ? 'red' : colorPalette
          }
          variant={'solid'}
          pos="absolute"
          top={-1}
          right={-2}
          fontWeight={600}
        >
          {value?.length ?? 0}
        </Badge>
      </ContentEditable>
    </HStack>
  )
}
