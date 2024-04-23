import { Dispatch, FC, useEffect, useState } from 'react'

import {
  Card,
  Checkbox,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Stack,
  Wrap,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react'
import { TbCheck, TbX } from 'react-icons/tb'

import { SimpleApi, SimpleEndpoint, SimpleRole } from '@fc/types'

export type PermissionCardProps = {
  role: SimpleRole
  filteredEndpoints?: string[]
  showEmptyEndpoints?: boolean
  setRole: (role: SimpleRole) => void
  editable?: boolean
}

export const PermissionCard: React.FC<PermissionCardProps> = ({
  role,
  filteredEndpoints = [],
  showEmptyEndpoints = false,
  setRole = () => {},
  editable = true,
}) => {
  const permissions = role.permissions

  const setPermissions = (newPermissions: SimpleEndpoint) => {
    setRole({ ...role, permissions: newPermissions })
  }

  const filteredPermission =
    filteredEndpoints.length > 0
      ? Object.keys(permissions).reduce((acc, key) => {
          if (filteredEndpoints.includes(key)) {
            acc[key] = permissions[key]
          }

          return acc
        }, {} as SimpleEndpoint)
      : permissions

  const setEndpointValue = (endpoint: string, value: SimpleApi) => {
    const newPermissions = { ...permissions, [endpoint]: value }
    setPermissions(newPermissions)
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{role.name}</Heading>
      </CardHeader>
      <CardBody>
        <Stack overflow={'auto'} maxHeight={'400px'}>
          {Object.keys(filteredPermission).map(endpoint => (
            <EndpointActions
              key={endpoint}
              endpoint={endpoint}
              values={filteredPermission[endpoint]}
              readonly={false}
              setValues={setEndpointValue}
            />
          ))}
        </Stack>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  )
}

type EndpointActionsProps = {
  endpoint: string
  values: SimpleApi
  setValues: (endpoint: string, values: SimpleApi) => void
  readonly?: boolean
}

export const EndpointActions: React.FC<EndpointActionsProps> = ({
  endpoint,
  setValues,
  readonly = false,
  ...props
}) => {
  const { backup, ...values } = props.values

  const handleChange = (): void => {
    if (!backup) {
      const falseValues = { ...values }
      Object.keys(falseValues).forEach(key => {
        falseValues[key] = false
      })
      setValues(endpoint, { ...falseValues, backup: values } as SimpleApi)
    } else {
      setValues(endpoint, { ...backup, backup: undefined } as SimpleApi)
    }
  }

  return (
    <Wrap
      p={2}
      mt={2}
      position={'relative'}
      pt={3}
      borderColor={'gray.100'}
      borderWidth={1}
      borderRadius={12}
    >
      <Checkbox
        position={'absolute'}
        top={-3}
        left={8}
        isDisabled={readonly}
        isChecked={!backup}
        onChange={handleChange}
        bg={'white'}
        fontWeight={'bold'}
      >
        {endpoint}
      </Checkbox>
      {Object.keys(values).map(action => (
        <ActionApi
          key={action}
          action={action}
          value={values[action]}
          setValue={(key, value) => {
            console.log(key, value)
            setValues(endpoint, { ...values, [key]: value })
          }}
          blocked={!!backup}
          readonly={readonly || !!backup}
        />
      ))}
    </Wrap>
  )
}

type ActionApiProps = {
  action: string
  value: boolean
  setValue: (api: string, value: boolean) => void
  readonly: boolean
  blocked: boolean
}
const ActionApi: FC<ActionApiProps> = ({
  action,
  value,
  setValue,
  blocked,
  readonly,
}) => {
  return (
    <Tag
      size={'md'}
      onClick={() => !readonly && setValue(action, !value)}
      variant={'solid'}
      colorScheme={blocked ? 'gray' : value ? 'green' : 'red'}
      cursor={readonly ? 'not-allowed' : 'pointer'}
    >
      <TagLeftIcon boxSize="12px" as={value ? TbCheck : TbX} />
      <TagLabel>{action}</TagLabel>
    </Tag>
  )
}
