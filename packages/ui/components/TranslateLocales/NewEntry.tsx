import { FC, useMemo, useState } from 'react'

import {
  Alert,
  AlertIcon,
  Badge,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  useToast,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { useTranslation } from 'next-i18next'

import { dicts } from './dicts'
import { EntryInput } from './EntryInput'

type EntryData = {
  key: string
  en: string
  tr: string
  nl: string
}

type NewEntryProps = {
  onSave: (data: EntryData) => void
} & Omit<ModalProps, 'children'>

export const NewEntry: FC<NewEntryProps> = ({ onSave, ...props }) => {
  const { t } = useTranslation()
  const [data, setData] = useState<EntryData>({
    key: '',
    en: '',
    tr: '',
    nl: '',
  })
  const autoTranslate = true // !!process.env.DEEPL_API_KEY
  const placeHolder = autoTranslate
    ? t('translate.new-entry.placeholder.auto-translate')
    : t('translate.new-entry.placeholder.no-auto-translate')
  const toast = useToast()

  const translateText = async (text: string, locale: string) => {
    try {
      if (!autoTranslate) return text

      const translation = await axios.post('/api/translate', {
        text,
        locale,
      })

      return translation.data
    } catch {
      return text
    }
  }

  const onPreCheck = () => {
    if (!data.key) {
      toast({
        title: t('translate.new-entry.toast.error.key-required'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

      return false
    }

    if (!data.en && !data.tr && !data.nl) {
      toast({
        title: t('translate.new-entry.toast.error.locale-required'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

      return false
    }

    return true
  }

  const onTranslate = async () => {
    if (!onPreCheck()) return null

    const mData = { ...data }

    const dataStr = mData.en || mData.tr || mData.nl
    if (!mData.en) {
      mData.en = await translateText(dataStr, 'en')
      setData(mData)
    }
    if (!mData.tr) {
      mData.tr = await translateText(dataStr, 'tr')
      setData(mData)
    }
    if (!mData.nl) {
      mData.nl = await translateText(dataStr, 'nl')
    }
    setData(mData)

    return mData
  }

  const onSaveEntry = async () => {
    const mData = await onTranslate()
    if (!mData) return

    onSave(mData)
    setData({ key: '', en: '', tr: '', nl: '' })
    props.onClose()
  }

  const list = useMemo(() => {
    if (!data.key) return []

    const filteredArr = Object.keys(dicts.en).filter(str =>
      str.startsWith(data.key),
    )
    const result: string[] = []

    const keyParts = data.key.split('.')
    filteredArr.forEach(str => {
      const parts = str.split('.')
      for (let i = 1; i <= keyParts.length + 1; i++) {
        const category = parts.slice(0, i).join('.')
        if (!result.includes(category)) {
          result.push(category)
        }
      }
    })

    return result
  }, [data.key])

  return (
    <Modal size={'3xl'} {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('translate.new-entry-header')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap={5}>
            {!autoTranslate && (
              <Alert status="error">
                <AlertIcon />
                {t('translate.new-entry.deepl-api-error')}
              </Alert>
            )}

            <EntryInput
              locale={'key'}
              defaultVal={data.key}
              placeholder={t('translate.new-entry.placeholder.key')}
              handleChange={val => setData({ ...data, key: val.toLowerCase() })}
            />

            <VStack
              gap={2}
              mt={3}
              maxH={'200px'}
              overflowY={'auto'}
              alignItems={'flex-start'}
            >
              {list.map(key => (
                <Badge
                  key={key}
                  ml={key.split('.').length * 3}
                  onClick={() => setData({ ...data, key })}
                  cursor={'pointer'}
                >
                  {key}
                </Badge>
              ))}
            </VStack>

            <Divider />

            <EntryInput
              locale={'en'}
              defaultVal={data.en}
              placeholder={placeHolder}
              handleChange={val => setData({ ...data, en: val })}
            />
            <EntryInput
              locale={'nl'}
              defaultVal={data.nl}
              placeholder={placeHolder}
              handleChange={val => setData({ ...data, nl: val })}
            />
            <EntryInput
              locale={'tr'}
              defaultVal={data.tr}
              placeholder={placeHolder}
              handleChange={val => setData({ ...data, tr: val })}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <HStack justify={'space-between'} gap={6} w={'full'}>
            <HStack>
              {autoTranslate && (
                <Button colorScheme="primary" onClick={onTranslate}>
                  {t('translate.button.translate')}
                </Button>
              )}
            </HStack>
            <HStack>
              <Button colorScheme="primary" onClick={onSaveEntry}>
                {t('add')}
              </Button>
              <Button onClick={props.onClose} colorScheme="red">
                {t('cancel')}
              </Button>
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
