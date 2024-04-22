import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Tag,
  Text,
  Wrap,
} from '@chakra-ui/react'

import { EndpointPermission, RoleTree } from './types'

type RoleCardProps = {
  role: RoleTree
  endpoints?: string[]
  selected?: string | null
  setSelected?: (endpoint: string | null) => void
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  endpoints,
  selected,
  setSelected = () => {},
}) => {
  const filter = (p: EndpointPermission) => {
    if (!p.apis.length) return false
    if (!endpoints || !endpoints.length) return true

    return endpoints.includes(p.endpoint)
  }

  const filteredRole = role.permissions.filter(filter)
  if (filteredRole.length === 0) return null

  return (
    <Card maxW="100%">
      <CardHeader>
        <Heading size="lg">{role.name}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing="4">
          {filteredRole.map(p => (
            <Wrap
              borderColor={'gray.100'}
              background={selected === p.endpoint ? 'blue.100' : 'white'}
              borderWidth={1}
              p={2}
              onClick={() =>
                setSelected(selected === p.endpoint ? null : p.endpoint)
              }
              borderRadius={'lg'}
              cursor={'pointer'}
              key={p.endpoint}
            >
              <Text fontWeight={'bold'} size="md">
                {p.endpoint}
              </Text>
              {p.apis.map(api => (
                <Tag size={'sm'} key={api}>
                  {api}
                </Tag>
              ))}
            </Wrap>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}
