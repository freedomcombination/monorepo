import { FC, useContext, useEffect, useState } from 'react'

import { Group, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { IconType } from 'react-icons'
import { BiHide } from 'react-icons/bi'
import { FaExclamationTriangle } from 'react-icons/fa'
import { FaCheck, FaCheckDouble, FaTrash } from 'react-icons/fa6'
import { IoMdRemoveCircleOutline } from 'react-icons/io'
import { MdOutlineTranslate } from 'react-icons/md'

import { IconButton } from '@fc/chakra'

import { DictContext } from './DictContext'
import { dicts } from './dicts'
import { EntryInput } from './EntryInput'
import { EditEntryProps, PriorityFilter } from './types'

export const EditEntry: FC<EditEntryProps> = ({ name, value }) => {
  const {
    keysToDelete,
    keysWarningSuppressed,
    toggleSuppressWarning,
    toggleWillDelete,
    locked,
    valueEN,
    valueTR,
    valueNL,
  } = useContext(DictContext)
  const [textTR, setTextTR] = useState(valueTR(name))
  const [textNL, setTextNL] = useState(valueNL(name))
  const [textEN, setTextEN] = useState(valueEN(name))

  useEffect(() => {
    dicts.en[name] = textEN
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textEN])
  useEffect(() => {
    dicts.tr[name] = textTR
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textTR])
  useEffect(() => {
    dicts.nl[name] = textNL
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textNL])

  const isSuppressed = keysWarningSuppressed.includes(name)
  const isPendingDeletion = keysToDelete.includes(name)

  const colors: Partial<Record<PriorityFilter, string>> = {
    [PriorityFilter.TRANSLATED]: 'green',
    [PriorityFilter.IDENTICAL]: 'orange',
    [PriorityFilter.MISSING]: 'purple',
    [PriorityFilter.IGNORED]: 'gray',
  }

  const icons: Partial<Record<PriorityFilter, IconType>> = {
    [PriorityFilter.TRANSLATED]: FaCheckDouble,
    [PriorityFilter.IDENTICAL]: FaExclamationTriangle,
    [PriorityFilter.MISSING]: IoMdRemoveCircleOutline,
    [PriorityFilter.IGNORED]: BiHide,
  }

  const color = colors[value]
  const Icon = icons[value] || FaCheck

  const canTranslate = () => {
    return (
      value === PriorityFilter.MISSING || value === PriorityFilter.IDENTICAL
    )
  }

  const toggleDelete = () => {
    toggleWillDelete(name)
  }

  const toggleSuppress = () => {
    toggleSuppressWarning(name)
  }

  const translateText = async (text: string, locale: string) => {
    try {
      const translation = await axios.post('/api/translate', {
        text,
        locale,
      })

      return translation.data
    } catch {
      return text
    }
  }

  /**
   * Translate the text into all languages if they are not already present.
   * If a language is already present, it will not be overwritten.
   * If all languages are already present, do nothing.
   */
  const translate = async () => {
    if (!textEN && !textNL && !textTR) return

    const selectBaseText = () => {
      if (textEN === textNL) return { toAll: !textTR, text: textTR ?? textNL }

      if (textEN === textTR) return { toAll: !textNL, text: textNL ?? textEN }

      return { toAll: true, text: textEN }
    }

    const { toAll, text } = selectBaseText()

    if (toAll) {
      setTextEN(await translateText(text, 'en'))
      setTextNL(await translateText(text, 'nl'))
      setTextTR(await translateText(text, 'tr'))
    } else {
      if (text !== textEN) setTextEN(await translateText(text, 'en'))

      if (text !== textNL) setTextNL(await translateText(text, 'nl'))

      if (text !== textTR) setTextTR(await translateText(text, 'tr'))
    }
  }

  return (
    <Stack gap={2} mt={2} mr={2}>
      <HStack color={color} gap={1} alignItems={'center'} position={'relative'}>
        <Icon />
        <Text
          fontWeight={600}
          mb={0}
          fontSize={'sm'}
          {...(isPendingDeletion && { textDecoration: 'line-through' })}
        >
          {name}
        </Text>
      </HStack>
      <HStack>
        <SimpleGrid columns={3} gap={4} flex={1}>
          <EntryInput
            locale={'en'}
            defaultVal={textEN}
            locked={locked}
            handleChange={setTextEN}
          />
          <EntryInput
            locale={'nl'}
            defaultVal={textNL}
            locked={locked}
            handleChange={setTextNL}
          />
          <EntryInput
            locale={'tr'}
            defaultVal={textTR}
            locked={locked}
            handleChange={setTextTR}
          />
        </SimpleGrid>
        <Group attached colorPalette={isSuppressed ? 'red' : 'gray'}>
          <IconButton
            icon={<FaTrash />}
            size="sm"
            disabled={locked}
            aria-label="delete"
            variant={isPendingDeletion ? 'solid' : 'outline'}
            onClick={toggleDelete}
          />

          <IconButton
            icon={<MdOutlineTranslate />}
            aria-label="translate"
            variant={canTranslate() ? 'outline' : 'solid'}
            isDisabled={canTranslate() ? false : true}
            onClick={translate}
          />

          <IconButton
            icon={<BiHide />}
            size="sm"
            aria-label="hide"
            variant={isSuppressed ? 'solid' : 'outline'}
            disabled={
              !isSuppressed &&
              (isPendingDeletion || value !== PriorityFilter.IDENTICAL)
            }
            onClick={toggleSuppress}
          />
        </Group>
      </HStack>
    </Stack>
  )
}
