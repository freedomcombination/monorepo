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

import { SimpleRole, SimpleApi } from '@fc/types/src/permissions'

type RoleCardProps = {
  role: SimpleRole
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
  const roles = Array.from(Object.entries(role.permissions))

  const filter = ([key]: [string, SimpleApi][]) => {
    if (!endpoints || !endpoints.length) return true

    return endpoints.includes(key)
  }

  console.log(role)

  const filteredRole = roles.filter(filter)
  if (filteredRole.length === 0) return null

  return (
    <Card maxW="100%">
      <CardHeader>
        <Heading size="lg">{role.name}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing="4" overflow={'auto'} maxHeight={'300px'}>
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
                <Tag size={'sm'} key={api + p.endpoint}>
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
