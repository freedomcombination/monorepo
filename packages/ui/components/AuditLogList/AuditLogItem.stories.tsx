import { Container, Stack } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { sample } from 'lodash'

import { PROFILE_MOCKS } from '@fc/mocks/profile'
import type { AuditLog, AuditLogAction } from '@fc/types'

import { AuditLogItem } from './AuditLogItem'

const logActions: AuditLogAction[] = [
  'approved',
  'created',
  'deleted',
  'published',
  'updated',
  'unpublished',
  'rejected',
]

const log: AuditLog = {
  action: sample(logActions) as AuditLogAction,
  createdAt: '2021-09-17T09:00:00.000Z',
  id: 1,
  modelId: 1,
  profile: PROFILE_MOCKS.data[0],
  text: 'Some text',
  uid: 'api::blog.blog',
  updatedAt: '2021-09-17T09:00:00.000Z',
}

export default {
  component: AuditLogItem,
  title: 'Admin/AuditLogItem',
  decorators: [
    Story => (
      <Container maxW="container.xl">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof AuditLogItem>

type Story = StoryObj<typeof AuditLogItem>

const AuditLogList: StoryFn<typeof AuditLogItem> = () => {
  return (
    <Stack gap={4}>
      {Array.from({ length: logActions.length }).map((_, i) => {
        return (
          <AuditLogItem
            key={i}
            log={{
              ...log,
              action: logActions[i],
            }}
            isOwnProfile={i % 2 === 0}
          />
        )
      })}
    </Stack>
  )
}

export const Default: Story = {
  render: AuditLogList,
}
