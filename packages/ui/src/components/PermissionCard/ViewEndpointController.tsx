import { useMemo } from 'react'

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

import { ControllerGroup, EndpointAction, EndpointControllers } from '@fc/types'

import { ActionApi } from './ActionApi'
import { ViewEndpointProps } from './types'
import { useAdminNav } from '../AdminNav/useAdminNav'

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
          o[k] = { ...v, enabled: false } as EndpointAction

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
