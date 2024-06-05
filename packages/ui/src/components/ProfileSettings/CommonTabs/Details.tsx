import { useEffect, useId, useMemo, useState } from 'react'

import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Compressor from '@uppy/compressor'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import ImageEditor from '@uppy/image-editor'
import { Dashboard as DashboardComponent } from '@uppy/react'
import { useTranslation } from 'next-i18next'
import { FaFileUpload, FaSave } from 'react-icons/fa'
import { FaCity, FaPhone, FaTrash } from 'react-icons/fa6'

import { useAuthContext } from '@fc/context'
import { Mutation } from '@fc/lib'
import { Profile, ProfileUpdateInput } from '@fc/types'

import { WAvatar } from '../../WAvatar'
import { MultiLine, SingleDetail, SingleLine } from '../CommonComponents'

import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import '@uppy/image-editor/dist/style.min.css'

export const Details = () => {
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
      .catch(e => console.log('Details update error', e))
      .finally(() => {
        checkAuth().finally(() => {
          setSaving(false)
        })
      })

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
    <MultiLine
      buttons={
        <Button
          isDisabled={!hasChanged}
          leftIcon={<FaSave />}
          size={'md'}
          isLoading={saving}
          onClick={() => setSaving(true)}
        >
          {t('save')}
        </Button>
      }
    >
      <Avatar />

      <SingleDetail
        title={t('profile.name')}
        placeholder={t('profile.name.ph')}
        defaultValue={details.name}
        onChange={value => setDetails({ ...details, name: value })}
      />

      <SingleDetail
        title={t('profile.bio')}
        placeholder={t('profile.bio.ph')}
        defaultValue={details.bio}
        useTextarea
        onChange={value => setDetails({ ...details, bio: value })}
      />

      <SingleDetail
        title={t('profile.occupation')}
        placeholder={t('profile.occupation.ph')}
        defaultValue={details.occupation}
        onChange={value => setDetails({ ...details, occupation: value })}
      />

      <SingleDetail
        title={t('profile.phone')}
        placeholder={t('profile.phone.ph')}
        left={<FaPhone />}
        defaultValue={details.phone}
        onChange={value => setDetails({ ...details, phone: value })}
      />

      <SingleDetail
        title={t('profile.city')}
        left={<FaCity />}
        placeholder={t('profile.city.ph')}
        defaultValue={details.city}
        onChange={value => setDetails({ ...details, city: value })}
      />
    </MultiLine>
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
    .use(Dashboard, {
      inline: false,
      autoOpen: 'imageEditor',
      animateOpenClose: true,
    })
    .use(ImageEditor, {
      quality: 0.9,
      cropperOptions: {
        viewMode: 1,
        aspectRatio: 1,
        croppedCanvasOptions: {
          minWidth: 256,
          minHeight: 256,
          maxWidth: 1024,
          maxHeight: 1024,
        },
      },
      actions: {
        revert: true,
        rotate: true,
        granularRotate: true,
        flip: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: false,
        cropWidescreenVertical: false,
      },
    })
}

const Avatar = () => {
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
      .catch(e => console.log('Avatar update error', e))
      .finally(() => {
        checkAuth().finally(() => {
          setSaveProgress(false)
          onClose()
        })
      })

    return () => setSaveProgress(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveProgress])

  return (
    <SingleLine title={t('profile.avatar')}>
      <HStack gap={16} alignItems={'end'}>
        <WAvatar
          size="xl"
          src={profile?.avatar}
          name={profile?.name || user?.username}
        />

        <HStack gap={3}>
          {!profile?.avatar ? (
            <Button
              leftIcon={<FaFileUpload />}
              minWidth={120}
              isDisabled={!!profile?.avatar}
              onClick={onOpen}
            >
              {t('profile.avatar.upload')}
            </Button>
          ) : (
            <Button
              leftIcon={<FaTrash />}
              minWidth={120}
              isDisabled={!profile?.avatar}
              onClick={() => setSaveProgress('delete')}
            >
              {t('delete')}
            </Button>
          )}
        </HStack>

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
                plugins={['ImageEditor']}
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
      </HStack>
    </SingleLine>
  )
}
