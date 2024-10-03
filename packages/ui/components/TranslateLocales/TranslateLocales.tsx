import { FC, useMemo, useState } from 'react'

import {
  Button,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  chakra,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaPlusCircle, FaSave } from 'react-icons/fa'
import { Virtuoso } from 'react-virtuoso'
import { useLocalStorage } from 'usehooks-ts'

import type { StrapiLocale } from '@fc/types'

import { DictContext } from './DictContext'
import { dicts } from './dicts'
import { EditEntry } from './EditEntry'
import { NewEntry } from './NewEntry'
import {
  Dict,
  PriorityFilter,
  PriorityKey,
  TranslateLocalesProps,
} from './types'

const { en, tr, nl } = dicts

const TranslateLocales: FC<TranslateLocalesProps> = ({ searchTerm }) => {
  const { t } = useTranslation()
  const [saving, setSaving] = useState(false)
  const [lastKey, setLastKey] = useState<string | undefined>(undefined)
  const [keysToDelete, setKeysToDelete] = useState<string[]>([])
  const [keysAdded, setKeysAdded] = useState<string[]>([])
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>(
    PriorityFilter.ALL,
  )
  const [suppressWarning, setSuppressWarning] = useLocalStorage<string[]>(
    'suppressWarning',
    [],
  )
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onAddNewEntry = (
    key: string,
    nlStr: string,
    trStr: string,
    enStr: string,
  ) => {
    en[key] = enStr
    tr[key] = trStr
    nl[key] = nlStr
    setKeysAdded([...keysAdded, key])
    reValidate(key)
  }

  const reValidate = (key?: string) => {
    setLastKey(key ?? (!!lastKey ? undefined : '1'))
  }

  const toggleWillDelete = (name: string) => {
    if (keysToDelete.includes(name)) {
      setKeysToDelete(keysToDelete.filter(x => x !== name))
    } else {
      setKeysToDelete([...keysToDelete, name])
    }
  }

  const toggleSuppressWarning = (name: string) => {
    if (suppressWarning.includes(name)) {
      setSuppressWarning(suppressWarning.filter(x => x !== name))
    } else {
      setSuppressWarning([...suppressWarning, name])
    }
  }

  // calculate priority
  const priorityKeys = useMemo(() => {
    const initialPriorityKeys = Object.keys(dicts.en)
      .sort()
      .map(key => ({
        key,
        priority: PriorityFilter.TRANSLATED,
      })) as PriorityKey[]

    const updatedPriorityKeys = initialPriorityKeys.map(priorityKey => {
      const { key } = priorityKey
      let { priority } = priorityKey

      if (suppressWarning.includes(key)) return priorityKey
      if (keysAdded.includes(key)) return { key, priority: PriorityFilter.NEW }

      if (!en[key] || !tr[key] || !nl[key]) {
        priority = PriorityFilter.MISSING
      } else if (
        en[key] === tr[key] ||
        en[key] === nl[key] ||
        tr[key] === nl[key]
      ) {
        priority = PriorityFilter.IDENTICAL
      } else {
        priority = PriorityFilter.TRANSLATED
      }

      return { key, priority }
    })

    return updatedPriorityKeys.sort((a, b) =>
      a.key === lastKey ? -1 : b.priority - a.priority,
    )
  }, [suppressWarning, keysAdded, lastKey])

  const stringifyDicts = () => {
    const getDict = (locale: StrapiLocale) =>
      priorityKeys.reduce((result, { key }) => {
        if (keysToDelete.includes(key)) return result

        return { ...result, [key]: dicts[locale][key] }
      }, {} as Dict)

    const newTR = getDict('tr')
    const newNL = getDict('nl')
    const newEN = getDict('en')

    return JSON.stringify({ newTR, newNL, newEN })
  }

  const onSave = async () => {
    setSaving(true)

    try {
      const body = stringifyDicts()

      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      toast({
        title: t('translate.save.failed'),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error: any) {
      toast({
        title: t('translate.save.success'),
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setSaving(false)
    }
  }
  const filterKeys = (filter: PriorityFilter) =>
    priorityKeys.filter(k => k.priority === filter)

  const missingKeys = filterKeys(PriorityFilter.MISSING)
  const identicalKeys = filterKeys(PriorityFilter.IDENTICAL)
  const translatedKeys = filterKeys(PriorityFilter.TRANSLATED)
  const ignoredKeys = priorityKeys
    .filter(k => suppressWarning.includes(k.key))
    .map(k => ({ ...k, priority: PriorityFilter.IGNORED }))

  // filter keys based on priority and showOnlyUntranslated
  const filteredKeys = useMemo(() => {
    if (priorityFilter === PriorityFilter.ALL) return priorityKeys
    if (priorityFilter === PriorityFilter.IGNORED) return ignoredKeys

    return priorityKeys.filter(k => k.priority === priorityFilter)
  }, [priorityKeys, priorityFilter, ignoredKeys])

  const filteredKeysBySearch = useMemo(() => {
    if (!searchTerm) return filteredKeys

    const lowerCase = searchTerm.toLowerCase()

    return filteredKeys.filter(k => k.key.toLowerCase().includes(lowerCase))
  }, [filteredKeys, searchTerm])

  return (
    <Stack gap={4} bg={'white'} p={6} flex={1}>
      <NewEntry
        isOpen={isOpen}
        onSave={data => onAddNewEntry(data.key, data.nl, data.tr, data.en)}
        onClose={onClose}
      />

      <HStack justify={'space-between'}>
        <HStack>
          <Button leftIcon={<FaPlusCircle />} onClick={onOpen}>
            {t('translate.button.add')}
          </Button>
        </HStack>
        <HStack justifyContent={'flex-end'} alignItems={'center'} spacing={6}>
          <RadioGroup
            onChange={value => setPriorityFilter(Number(value))}
            value={`${priorityFilter}`}
            colorScheme="primary"
          >
            <Stack direction="row" spacing={4}>
              <Radio value={`${PriorityFilter.ALL}`}>
                {t('translate.radio.all')}{' '}
                <chakra.span color="gray.400" fontSize="sm">
                  ({priorityKeys.length})
                </chakra.span>
              </Radio>
              <Radio value={`${PriorityFilter.TRANSLATED}`}>
                {t('translate.radio.translated')}{' '}
                <chakra.span color="gray.400" fontSize="sm">
                  ({translatedKeys.length})
                </chakra.span>
              </Radio>
              <Radio value={`${PriorityFilter.IDENTICAL}`}>
                {t('translate.radio.identical')}{' '}
                <chakra.span color="gray.400" fontSize="sm">
                  ({identicalKeys.length})
                </chakra.span>
              </Radio>
              <Radio value={`${PriorityFilter.MISSING}`}>
                {t('translate.radio.missing')}{' '}
                <chakra.span color="gray.400" fontSize="sm">
                  ({missingKeys.length})
                </chakra.span>
              </Radio>
              <Radio value={`${PriorityFilter.IGNORED}`}>
                {t('translate.radio.ignored')}{' '}
                <chakra.span color="gray.400" fontSize="sm">
                  ({ignoredKeys.length})
                </chakra.span>
              </Radio>
            </Stack>
          </RadioGroup>

          <Button leftIcon={<FaSave />} isLoading={saving} onClick={onSave}>
            {t('save')}
          </Button>
        </HStack>
      </HStack>

      <DictContext.Provider
        value={{
          keysToDelete,
          keysWarningSuppressed: suppressWarning,
          toggleWillDelete,
          toggleSuppressWarning,
          locked: saving,
          reValidate,
          valueEN: (key: string) => dicts.en[key],
          valueTR: (key: string) => dicts.tr[key],
          valueNL: (key: string) => dicts.nl[key],
        }}
      >
        <Virtuoso
          style={{
            height: 'calc(100vh - 270px)',
          }}
          totalCount={filteredKeysBySearch.length}
          itemContent={index => {
            const k = filteredKeysBySearch[index]

            return <EditEntry key={k.key} name={k.key} value={k.priority} />
          }}
        />
      </DictContext.Provider>
    </Stack>
  )
}

export default TranslateLocales
