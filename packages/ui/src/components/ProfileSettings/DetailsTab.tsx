import { useEffect, useId, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Center,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import ImageEditor from '@uppy/image-editor'
import { Dashboard as DashboardComponent } from '@uppy/react'
import { useTranslation } from 'next-i18next'
import { FaFileUpload, FaSave } from 'react-icons/fa'
import { FaCity, FaPhone, FaTrash } from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { Profile, ProfileUpdateInput } from '@fc/types'

import { FormElement } from './FormElement'
import { WAvatar } from '../WAvatar'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'

const AvatarForm = () => {
  const { user, profile, token, checkAuth } = useAuthContext()
  const { t } = useTranslation()
  const uppy = useMemo(() => getUppy(), [])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [file, setFile] = useState<File | Blob | null>(null)
  const [saveProgress, setSaveProgress] = useState<'delete' | 'update' | false>(
    false,
  )

  uppy.on('complete', result => {
    const file = result.successful[0]
    setFile(file.data)
  })

  uppy.on('file-editor:complete', file => {
    setFile(file.data)
  })

  const onCancel = () => {
    setFile(null)
    onClose()
  }

  useEffect(() => {
    if (!saveProgress || !profile) {
      return setSaveProgress(false)
    }

    Mutation.put<Profile, ProfileUpdateInput>(
      'profiles',
      profile.id,
      { avatar: saveProgress === 'update' ? file : null } as ProfileUpdateInput,
      token as string,
    )
      .then(() => {
        checkAuth().then(() => {
          setSaveProgress(false)
          onClose()
        })
      })
      .catch(e => console.error('Avatar update error', e))

    return () => setSaveProgress(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveProgress])

  const hasAvatar = !!profile?.avatar
  const label = hasAvatar ? t('delete') : t('profile.avatar.upload')

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('profile.avatar.header')}</ModalHeader>
          {!saveProgress && <ModalCloseButton />}
          <ModalBody>
            <DashboardComponent
              id={useId()}
              width="100%"
              height={500}
              uppy={uppy}
              autoOpen={'imageEditor'}
              hideUploadButton
              showSelectedFiles
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onCancel}
              isDisabled={!!saveProgress}
            >
              {t('close')}
            </Button>
            <Button
              colorScheme="primary"
              isDisabled={!file}
              isLoading={!!saveProgress}
              onClick={() => setSaveProgress('update')}
            >
              {t('save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack>
        <Box pos={'relative'}>
          <WAvatar
            size="2xl"
            src={profile?.avatar}
            name={profile?.name || user?.username}
          />
          <Tooltip label={label} placement="top">
            <IconButton
              pos={'absolute'}
              right={0}
              top={0}
              borderWidth={4}
              borderColor={'white'}
              colorScheme={hasAvatar ? 'red' : 'primary'}
              aria-label={label}
              rounded={'full'}
              onClick={() =>
                hasAvatar
                  ? confirm(t('delete.confirm')) && setSaveProgress('delete')
                  : onOpen()
              }
              icon={hasAvatar ? <FaTrash /> : <FaFileUpload />}
            />
          </Tooltip>
        </Box>
      </VStack>
    </>
  )
}

export const DetailsTab = () => {
  const { profile, token, checkAuth } = useAuthContext()
  const { t } = useTranslation()
  const [details, setDetails] = useState<Profile>({
    name: profile?.name ?? null,
    bio: profile?.bio ?? null,
    occupation: profile?.occupation ?? null,
    phone: profile?.phone ?? null,
    city: profile?.city ?? null,
  } as Profile)
  const [saving, setSaving] = useState(false)

  const hasChanged = Object.entries(details).some(
    ([key, value]) => profile?.[key as keyof Profile] !== value,
  )

  useEffect(() => {
    if (!saving || !profile) {
      setSaving(false)

      return
    }

    Mutation.put<Profile, ProfileUpdateInput>(
      'profiles',
      profile.id,
      details as ProfileUpdateInput,
      token as string,
    )
      .then(() => {
        checkAuth().then(() => {
          setSaving(false)
        })
      })
      .catch(e => console.error('Details update error', e))

    return () => setSaving(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving])

  if (!profile) {
    return (
      <Center width={'100%'} height={250} flex={1}>
        <Text>{t('profile.not-found')}</Text>
      </Center>
    )
  }

  return (
    <Stack spacing={8}>
      <AvatarForm />

      <FormElement
        title={t('profile.name')}
        placeholder={t('profile.name.ph')}
        defaultValue={details.name}
        onChange={value => setDetails({ ...details, name: value })}
      />

      <FormElement
        title={t('profile.bio')}
        placeholder={t('profile.bio.ph')}
        defaultValue={details.bio}
        useTextarea
        onChange={value => setDetails({ ...details, bio: value })}
      />

      <FormElement
        title={t('profile.occupation')}
        placeholder={t('profile.occupation.ph')}
        defaultValue={details.occupation}
        onChange={value => setDetails({ ...details, occupation: value })}
      />

      <FormElement
        title={t('profile.phone')}
        placeholder={t('profile.phone.ph')}
        left={<FaPhone />}
        defaultValue={details.phone}
        onChange={value => setDetails({ ...details, phone: value })}
      />

      <FormElement
        title={t('profile.city')}
        left={<FaCity />}
        placeholder={t('profile.city.ph')}
        defaultValue={details.city}
        onChange={value => setDetails({ ...details, city: value })}
      />

      <Button
        isDisabled={!hasChanged}
        leftIcon={<FaSave />}
        size={'lg'}
        isLoading={saving}
        onClick={() => setSaving(true)}
        alignSelf={'start'}
      >
        {t('save')}
      </Button>
    </Stack>
  )
}

const getUppy = () => {
  return new Uppy({
    meta: { type: 'avatar' },
    autoProceed: true,
    restrictions: {
      maxNumberOfFiles: 1,
      allowedFileTypes: ['image/*'],
    },
  })
    .use(Compressor, {
      id: 'Compressor',
      quality: 0.9,
      limit: 2,
    })
    .use(ImageEditor)
}
