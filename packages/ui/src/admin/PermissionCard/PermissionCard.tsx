import { FC, useMemo } from 'react'

import {
  Box,
  Checkbox,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { TbCheck, TbX } from 'react-icons/tb'

import {
  APIStatus,
  ControllerGroup,
  EndpointControllers,
  Permissions,
} from '@fc/types'

import { MasonryGrid } from '../../components/MasonryGrid'
import { useAdminNav } from '../AdminNav/useAdminNav'

export type PermissionCardProps = {
  permission: Permissions
  filters?: string[]
  onChange?: (permission: Permissions) => void
  editable?: boolean
}

export const PermissionCard: React.FC<PermissionCardProps> = ({
  permission,
  filters = [],
  editable = false,
  onChange = () => {},
}) => {
  const filteredPermission =
    filters.length > 0
      ? Object.keys(permission).reduce((acc, key) => {
          if (filters.includes(key)) {
            acc[key] = permission[key]
          }

          return acc
        }, {} as Permissions)
      : permission

  const setEndpointValue = (
    endpoint: string,
    controllers: EndpointControllers,
  ) => {
    const newPermission = {
      ...permission,
      [endpoint]: { controllers },
    }
    onChange(newPermission)
  }

  return (
    <MasonryGrid cols={[1, 1, 1, 2, 3, 4]}>
      {Object.entries(filteredPermission).map(([endpoint, { controllers }]) => {
        return (
          <ViewEndpointControllers
            key={endpoint}
            endpoint={endpoint}
            controllers={controllers}
            readonly={editable === false}
            onChange={setEndpointValue}
          />
        )
      })}
    </MasonryGrid>
  )
}

type ViewEndpointProps = {
  endpoint: string
  controllers: EndpointControllers
  onChange: (endpoint: string, values: EndpointControllers) => void
  readonly?: boolean
}

export const ViewEndpointControllers: React.FC<ViewEndpointProps> = ({
  endpoint,
  onChange,
  readonly = false,
  controllers,
}) => {
  const { collectMenusRelated } = useAdminNav()
  const { backup, ...values } = controllers
  const name = endpoint.split('::')[1]

  const menuItems = useMemo(() => {
    return collectMenusRelated(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  const handleChange = (): void => {
    if (!backup) {
      const falseValues = Object.entries(values).reduce((acc, [key, value]) => {
        acc[key] = Object.entries(value).reduce((o, [k, v]) => {
          o[k] = { ...v, enabled: false } as APIStatus

          return o
        }, {} as ControllerGroup)

        return acc
      }, {} as EndpointControllers)

      onChange(endpoint, {
        ...falseValues,
        backup: values,
      } as EndpointControllers)
    } else {
      onChange(endpoint, {
        ...backup,
        backup: undefined,
      } as EndpointControllers)
    }
  }

  return (
    <Stack
      p={4}
      mt={2}
      position={'relative'}
      pt={6}
      borderColor={'gray.100'}
      borderWidth={1}
      borderRadius={12}
      spacing={4}
    >
      <Box
        position={'absolute'}
        top={-3}
        left={6}
        noOfLines={1}
        fontWeight={'bold'}
      >
        {!readonly ? (
          <Checkbox bg={'white'} isChecked={!backup} onChange={handleChange}>
            {name}
          </Checkbox>
        ) : (
          <Text bg={'white'} px={2}>
            {name}
          </Text>
        )}
      </Box>
      <VStack
        alignItems={'flex-start'}
        divider={<StackDivider borderColor="gray.200" />}
      >
        <Wrap>
          {Object.values(values).flatMap(action => {
            return Object.entries(action).map(([key, obj]) => {
              return (
                <ActionApi
                  key={key}
                  action={key}
                  value={obj.enabled}
                  onChange={value => {
                    obj.enabled = value
                    onChange(endpoint, values)
                  }}
                  blocked={!!backup}
                  readonly={readonly || !!backup}
                />
              )
            })
          })}
        </Wrap>
        {menuItems.length > 0 && (
          <Wrap>
            {menuItems.map(item => {
              return (
                <Tag key={item.label} size={'md'}>
                  <TagLeftIcon boxSize="28px" pt={2}>
                    {item.icon}
                  </TagLeftIcon>
                  <TagLabel>{item.label}</TagLabel>
                </Tag>
              )
            })}
          </Wrap>
        )}
      </VStack>
    </Stack>
  )
}

type ActionApiProps = {
  action: string
  value: boolean
  onChange: (value: boolean) => void
  readonly: boolean
  blocked: boolean
}
const ActionApi: FC<ActionApiProps> = ({
  action,
  value,
  onChange,
  blocked,
  readonly,
}) => {
  return (
    <Tag
      size={'md'}
      onClick={() => !readonly && onChange(!value)}
      variant={'solid'}
      colorScheme={blocked ? 'gray' : value ? 'green' : 'red'}
      {...(!readonly
        ? {
            cursor: 'pointer',
            _hover: { boxShadow: 'lg' },
          }
        : {})}
    >
      <TagLeftIcon boxSize="18px" as={value ? TbCheck : TbX} />
      <TagLabel>{action}</TagLabel>
    </Tag>
  )
}
