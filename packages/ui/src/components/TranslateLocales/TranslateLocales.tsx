import React, { FC, useContext, useEffect, useMemo, useState } from 'react'

import {
  Button,
  ButtonGroup,
  Divider,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { BiHide } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'
import { FaCheck, FaCheckDouble, FaTrash } from 'react-icons/fa6'
import { MdOutlineError } from 'react-icons/md'
import { useLocalStorage } from 'usehooks-ts'

import en from '@fc/ui/public/locales/en/common.json'
import nl from '@fc/ui/public/locales/nl/common.json'
import tr from '@fc/ui/public/locales/tr/common.json'

type TranslateLocalesProps = {
  searchTerm?: string
}

type EditEntryProps = {
  name: string
  value: number
}

type Dict = Record<string, string>

type DictContextProps = {
  dicts: Record<'nl' | 'tr' | 'en', Dict>
  willDelete: string[]
  suppressWarning: string[]
  toggleWillDelete: (name: string) => void
  toggleSuppressWarning: (name: string) => void
  locked: boolean
}

const DictContext = React.createContext<DictContextProps>(
  {} as DictContextProps,
)

export const TranslateLocales: FC<TranslateLocalesProps> = ({ searchTerm }) => {
  const { t } = useTranslation()
  const [saving, setSaving] = useState(false)
  const [showOnlyUntranslated, setShowOnlyUntranslated] = useState(false)
  const [dicts] = useState<Record<'nl' | 'tr' | 'en', Dict>>({
    nl: {},
    tr: {},
    en: {},
  })
  const [willDelete, setWillDelete] = useState<string[]>([])
  const [suppressWarning, setSuppressWarning] = useLocalStorage<string[]>(
    'suppressWarning',
    [],
  )
  const toast = useToast()

  const toggleWillDelete = (name: string) => {
    if (willDelete.includes(name)) {
      setWillDelete(willDelete.filter(x => x !== name))
    } else {
      setWillDelete([...willDelete, name])
    }
  }

  const toggleSuppressWarning = (name: string) => {
    if (suppressWarning.includes(name)) {
      setSuppressWarning(suppressWarning.filter(x => x !== name))
    } else {
      setSuppressWarning([...suppressWarning, name])
    }
  }

  // obtain keys
  const keys = useMemo(() => {
    return Object.keys(en)
      .sort()
      .map(k => {
        return { key: k, priority: 0 }
      })
  }, [])

  const onSave = async () => {
    const newTR = keys.reduce((result, { key }) => {
      if (!willDelete.includes(key))
        result[key] = dicts.tr[key] ?? tr[key as keyof typeof tr]

      return result
    }, {} as Dict)

    const newNL = keys.reduce((result, { key }) => {
      if (!willDelete.includes(key))
        result[key] = dicts.nl[key] ?? nl[key as keyof typeof nl]

      return result
    }, {} as Dict)

    const newEN = keys.reduce((result, { key }) => {
      if (!willDelete.includes(key))
        result[key] = dicts.en[key] ?? en[key as keyof typeof en]

      return result
    }, {} as Dict)

    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newTR, newNL, newEN }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
  }

  useEffect(() => {
    if (!saving) return

    onSave()
      .then(() => {
        toast({
          title: 'Çeviriler başarıyla kaydedildi!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch(e => {
        toast({
          title: 'Çevirileri kaydederken hata oluştu!',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      })
      .finally(() => setSaving(false))

    return () => setSaving(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving])

  // calculate priority
  useMemo(() => {
    keys.forEach(k => {
      k.priority = 0
      if (suppressWarning.includes(k.key)) return
      const kn = k.key as keyof typeof en
      if (en[kn] === nl[kn as keyof typeof nl]) k.priority++

      if (en[kn] === tr[kn as keyof typeof tr]) k.priority++

      if (nl[kn as keyof typeof nl] === tr[kn as keyof typeof tr]) k.priority++
    })
  }, [keys, suppressWarning])

  // filter keys based on priority and showOnlyUntranslated
  const filteredKeys = useMemo(() => {
    if (!showOnlyUntranslated)
      return keys.sort((a, b) => b.priority - a.priority)

    return keys
      .filter(k => k.priority > 0)
      .sort((a, b) => b.priority - a.priority)
  }, [keys, showOnlyUntranslated])

  const filteredKeysBySearch = useMemo(() => {
    if (!searchTerm) return filteredKeys
    const lowerCase = searchTerm.toLowerCase()

    return filteredKeys.filter(k => k.key.toLowerCase().includes(lowerCase))
  }, [filteredKeys, searchTerm])

  return (
    <VStack gap={4} width={'100%'} bg={'white'} p={6} flex={1}>
      <HStack justifyContent={'flex-end'} width={'100%'} alignItems={'center'}>
        <Text fontWeight={500}>Show only untranslated</Text>
        <Switch
          id="showOnlyUntranslated"
          checked={showOnlyUntranslated}
          onChange={() => setShowOnlyUntranslated(!showOnlyUntranslated)}
          size={'lg'}
        />

        <Button
          leftIcon={<FaSave />}
          isLoading={saving}
          onClick={() => setSaving(true)}
        >
          {t('save')}
        </Button>
      </HStack>

      <DictContext.Provider
        value={{
          dicts,
          willDelete,
          suppressWarning,
          toggleWillDelete,
          toggleSuppressWarning,
          locked: saving,
        }}
      >
        <VStack gap={3} divider={<Divider />} width={'100%'}>
          {filteredKeysBySearch.map(k => (
            <EditEntry key={k.key} name={k.key} value={k.priority} />
          ))}
        </VStack>
      </DictContext.Provider>
    </VStack>
  )
}

const EditEntry: FC<EditEntryProps> = ({ name, value }) => {
  const {
    willDelete,
    suppressWarning,
    toggleSuppressWarning,
    toggleWillDelete,
    locked,
  } = useContext(DictContext)

  const isSuppressed = suppressWarning.includes(name)
  const isWillDelete = willDelete.includes(name)
  const nValue = isSuppressed ? 0 : value

  const result = [
    'all translated',
    'take a look',
    'take a look',
    'untranslated',
  ][nValue]
  const color = ['blue', 'orange', 'orange', 'red'][nValue]
  const icon = [
    <FaCheckDouble key={4} />,
    <FaCheck key={2} />,
    <FaCheck key={3} />,
    <MdOutlineError key={1} />,
  ][nValue]

  return (
    <Stack gap={2} justifyContent={'flex-start'} width={'100%'}>
      <HStack color={color} gap={1} alignItems={'center'} position={'relative'}>
        <Text
          fontWeight={600}
          fontSize={'md'}
          mr={3}
          {...(isWillDelete && { textDecoration: 'line-through' })}
        >
          {name}
        </Text>
        {icon}
        <Text fontWeight={300}>{result}</Text>

        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          position={'absolute'}
          right={5}
          isDisabled={locked}
        >
          <IconButton
            icon={<FaTrash />}
            aria-label="delete"
            bg={isWillDelete ? 'red.600' : 'gray.200'}
            color="black"
            onClick={() => toggleWillDelete(name)}
          />

          <IconButton
            icon={<BiHide />}
            aria-label="hide"
            bg={isSuppressed ? 'red.600' : 'gray.200'}
            color="black"
            onClick={() => toggleSuppressWarning(name)}
          />
        </ButtonGroup>
      </HStack>
      <SimpleGrid
        columns={3}
        mx={4}
        spacing={4}
        width={'100%'}
        justifyContent={'space-evenly'}
      >
        <EntryInput locale={'en'} localeKey={name} dict={en} />
        <EntryInput locale={'nl'} localeKey={name} dict={nl} />
        <EntryInput locale={'tr'} localeKey={name} dict={tr} />
      </SimpleGrid>
    </Stack>
  )
}

type EntryInputProps = {
  locale: string
  localeKey: string
  dict: Record<string, string>
}

const EntryInput: FC<EntryInputProps> = ({ locale, localeKey, dict }) => {
  const { dicts, locked } = useContext(DictContext)
  const tDict = dicts[locale as keyof typeof dicts]
  const defVal = dict[localeKey]
  const newVal = tDict[localeKey]
  const [color, setColor] = useState(
    defVal !== newVal ? 'green.500' : 'gray.300',
  )

  return (
    <InputGroup>
      <InputLeftAddon>{locale}</InputLeftAddon>
      <Input
        defaultValue={defVal}
        type="text"
        isDisabled={locked}
        _placeholder={{
          color,
        }}
        onChange={e => {
          tDict[localeKey] = e.target.value
          setColor(e.target.value !== defVal ? 'green.500' : 'gray.300')
        }}
      />
    </InputGroup>
  )
}
