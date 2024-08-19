import { ReactNode, useEffect, useState } from 'react'

import {
  Center,
  Separator,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaEnvelope, FaUser } from 'react-icons/fa6'

import { Button } from '@fc/chakra'
import { API_URL } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { SessionUser } from '@fc/types'

import { ChangePasswordForm } from './ChangePasswordForm'

type CredentialProps = {
  isValid: (user: SessionUser | null, value: string) => boolean
  initialValue: string
  name: 'username' | 'email'
  placeholder: string
  leftIcon: ReactNode
}

const asyncUpdate = async (param: Record<string, string>, token: string) => {
  const url = API_URL + '/api/profiles/user'
  const body = JSON.stringify(param)
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })
  if (!result.ok)
    throw new Error('Failed to update user profile :' + result.status)
}

const Credential: React.FC<CredentialProps> = ({
  isValid = () => {
    return false
  },
  initialValue = '',
  name,
  placeholder,
  leftIcon,
}) => {
  const { user, token, checkAuth } = useAuthContext()
  const [edit, setEdit] = useState(false)
  const [saving, setSaving] = useState(false)
  const [value, setValue] = useState(initialValue)

  const handleClick = () => {
    if (edit === false) {
      setEdit(true)
    } else if (isValid(user, value)) {
      setSaving(true)
    } else {
      setEdit(false)
    }
  }

  useEffect(() => {
    if (!saving) return

    asyncUpdate({ [name]: value }, token as string)
      .then(() => {
        checkAuth().then(() => {
          setSaving(false)
          setEdit(false)
        })
      })
      .catch(e => console.error('Update error', name, value, e))

    return () => setSaving(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving])

  const { t } = useTranslation()

  return (
    <InputGroup size="lg">
      <InputLeftElement>
        {!saving ? leftIcon : <Spinner size="sm" />}
      </InputLeftElement>
      <Input
        pr="7em"
        type={name === 'email' ? 'email' : 'text'}
        placeholder={placeholder}
        disabled={!edit}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <InputRightElement width="7rem" justifyContent={'flex-end'} pr={1}>
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {edit ? (isValid(user, value) ? t('save') : t('cancel')) : t('edit')}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export const SecurityTab = () => {
  const { t } = useTranslation()
  const { user } = useAuthContext()

  if (!user) {
    return (
      <Center width={'100%'} height={'100%'}>
        <Stack>
          <Spinner />
        </Stack>
      </Center>
    )
  }

  return (
    <Stack gap={8}>
      <FormControl>
        <FormLabel fontWeight={600}>{t('profile.security.username')}</FormLabel>
        <Credential
          name={'username'}
          initialValue={user.username}
          isValid={(user: SessionUser | null, username: string): boolean => {
            return username.length > 2 && username !== user?.username
          }}
          placeholder={t('profile.username.ph')}
          leftIcon={<FaUser />}
        />
      </FormControl>
      <FormControl>
        <FormLabel fontWeight={600}>{t('profile.security.email')}</FormLabel>
        <Credential
          name={'email'}
          initialValue={user.email}
          isValid={(user: SessionUser | null, email: string) => {
            if (!email || email === user?.email) return false
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

            return emailRegex.test(email)
          }}
          placeholder={t('profile.email.ph')}
          leftIcon={<FaEnvelope />}
        />
      </FormControl>
      <Separator />
      <ChangePasswordForm />
    </Stack>
  )
}
