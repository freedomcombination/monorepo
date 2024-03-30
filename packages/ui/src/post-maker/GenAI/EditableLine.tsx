import {
  Badge,
  HStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react'
import { FaInfo, FaX } from 'react-icons/fa6'

import { OgImageParams } from '@fc/types'

import { Caps, ContentEditable } from '../../components'
import { ContentEditableProps } from '../../components/ContentEditable/types'

export type EditableProps = ContentEditableProps & {
  isDisabled?: boolean
  onDelete?: () => void
  isDescription?: boolean
  imageParams?: OgImageParams
}

export const EditableLine: React.FC<EditableProps> = ({
  onDelete,
  isDescription = false,
  contentEditable = true,
  isDisabled = false,
  imageParams = {},
  value,
  ...rest
}) => {
  const disabled = isDisabled || !contentEditable

  return (
    <HStack
      pos={'relative'}
      px={2}
      align={'baseline'}
      rounded={'md'}
      pl={isDescription ? 0 : 4}
      role={'group'}
    >
      <IconButton
        isDisabled={disabled}
        aria-label="delete"
        variant={'ghost'}
        colorScheme="red"
        size={'xs'}
        icon={<FaX />}
        onClick={onDelete}
        rounded={'full'}
      />
      {isDescription && (
        <Popover trigger="hover" placement="bottom-start" isLazy>
          <PopoverTrigger>
            <IconButton
              variant={'outline'}
              size="xs"
              aria-label={'Show caps'}
              icon={<FaInfo />}
              colorScheme="blue"
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
        {...rest}
      />
      <Badge
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
        _groupFocusWithin={{
          opacity: 1,
        }}
        transition={'opacity 0.3s ease-in-out'}
        colorScheme="primary"
        variant={'subtle'}
        pos="absolute"
        top={-1}
        right={-1}
        fontWeight={600}
      >
        {value?.length ?? 0}
      </Badge>
    </HStack>
  )
}
