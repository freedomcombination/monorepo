import { useId, useState } from 'react'

import {
  Box,
  Center,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaFileUpload, FaSave } from 'react-icons/fa'
import { FaCity, FaPhone, FaTrash } from 'react-icons/fa6'

import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context/auth'
import { useUpdateModelMutation } from '@fc/services/common/updateModel'
import type { Profile } from '@fc/types'

import { FormElement } from './FormElement'
import { FilePicker } from '../FilePicker'
import { WAvatar } from '../WAvatar'

const AvatarForm = () => {
  const { user, profile, checkAuth } = useAuthContext()
  const { t } = useTranslation()
  const { open, onOpen, onClose, onToggle } = useDisclosure()
  const [file, setFile] = useState<File | Blob | null>(null)

  const onCancel = () => {
    setFile(null)
    onClose()
  }

  const { mutate, isPending } = useUpdateModelMutation('profiles')

  const onDeleteOrUpload = async (action: 'delete' | 'upload') => {
    if (!profile) {
      return
    }

    const avatar = (action === 'delete' ? null : file) as File

    mutate(
      { id: profile.id, avatar },
      {
        onSuccess: async () => {
          await checkAuth()
          onClose()
        },
      },
    )
  }

  const onUpload = () => onDeleteOrUpload('upload')
  const onDelete = async () => onDeleteOrUpload('delete')

  const hasAvatar = !!profile?.avatar
  const label = hasAvatar ? t('delete') : t('profile.avatar.upload')

  return (
    <>
      <Modal
        open={open}
        onOpenChange={onToggle}
        size="lg"
        closeOnInteractOutside={false}
        closeOnEscape={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('profile.avatar.header')}</ModalHeader>
          {!isPending && <ModalCloseButton />}
          <ModalBody>
            <FilePicker id={useId()} onLoaded={files => setFile(files?.[0])} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorPalette="blue"
              mr={3}
              onClick={onCancel}
              disabled={isPending}
            >
              {t('close')}
            </Button>
            <Button
              colorPalette="primary"
              disabled={!file}
              loading={isPending}
              onClick={onUpload}
            >
              {t('save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack>
        <Box pos={'relative'}>
          {isPending ? (
            <Center
              bg="blackAlpha.300"
              rounded={'full'}
              borderWidth={1}
              boxSize={128}
            >
              <Spinner />
            </Center>
          ) : (
            <WAvatar
              size="2xl"
              src={profile?.avatar}
              name={profile?.name || user?.username}
            />
          )}
          <Tooltip content={label} positioning={{ placement: 'top' }}>
            <IconButton
              pos={'absolute'}
              right={0}
              top={0}
              borderWidth={4}
              borderColor={'white'}
              colorPalette={hasAvatar ? 'red' : 'primary'}
              aria-label={label}
              rounded={'full'}
              onClick={() =>
                hasAvatar
                  ? confirm(t('delete.confirm')) && onDelete()
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
  const { profile } = useAuthContext()
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

  if (!profile) {
    return (
      <Center width={'100%'} height={250} flex={1}>
        <Text>{t('profile.not-found')}</Text>
      </Center>
    )
  }

  return (
    <Stack gap={8}>
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
        leftAddon={<FaPhone />}
        defaultValue={details.phone}
        onChange={value => setDetails({ ...details, phone: value })}
      />

      <FormElement
        title={t('profile.city')}
        leftAddon={<FaCity />}
        placeholder={t('profile.city.ph')}
        defaultValue={details.city}
        onChange={value => setDetails({ ...details, city: value })}
      />

      <Button
        disabled={!hasChanged}
        leftIcon={<FaSave />}
        size={'lg'}
        loading={saving}
        onClick={() => setSaving(true)}
        alignSelf={'start'}
      >
        {t('save')}
      </Button>
    </Stack>
  )
}
