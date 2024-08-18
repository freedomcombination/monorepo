import { FC } from 'react'

import { Box, Separator, HStack, Link, Stack, Text } from '@chakra-ui/react'

import { TimelineBoardProps } from './types'
import { TweetCard } from '../TweetCard'

export const TimelineBoard: FC<TimelineBoardProps> = ({ timelines }) => {
  return (
    <HStack gap={4} overflowY="auto">
      {timelines?.map(timeline => (
        <Box
          key={timeline.id}
          w="500px"
          overflowX="auto"
          borderRadius="6px"
          bg={'white'}
          shadow={'md'}
        >
          <Link
            href={`https://x.com/${timeline?.userData?.username}`}
            target="_blank"
            rel="noreferrer noopener"
            cursor="pointer"
          >
            <Box bg="twitter.500" borderBottom="1px" color="white" p={3}>
              <Text fontSize={'sm'} wordBreak={'break-all'} fontWeight={700}>
                {timeline?.userData?.name} - @{timeline?.userData?.username}
              </Text>
            </Box>
          </Link>

          <Stack
            overflowY="auto"
            h={'calc(100vh - 148px)'}
            divider={<Separator />}
          >
            {timeline?.tweets?.map((tweet, key) => {
              // FIXME: Why image is not showing up?
              return (
                <TweetCard
                  tweet={{
                    ...tweet,
                    user: timeline.userData,
                  }}
                  editable
                  key={key}
                />
              )
            })}
          </Stack>
        </Box>
      ))}
    </HStack>
  )
}
