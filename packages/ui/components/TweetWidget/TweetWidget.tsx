import { Box, Image, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import type { Tweet } from '@fc/types'

import { TweetCard } from '../TweetCard'

type TweetWidgetProps = {
  title: string
  tweets?: Tweet[] | null
}

export const TweetWidget = ({
  title,
  tweets,
}: TweetWidgetProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Stack h={'inherit'}>
      <Text color="gray.500" fontSize="sm">
        {title}
      </Text>
      <Box bg="white" overflow="auto">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {tweets && tweets.length > 0 ? (
            tweets.map((tweet, index) => {
              return <TweetCard key={index} tweet={tweet} px={0} />
            })
          ) : (
            <Stack textAlign="center">
              <Image src={'/images/tweet-widget.svg'} alt="no tweets" />
              <Text>{t('post.no-tweet')}</Text>
            </Stack>
          )}
        </VStack>
      </Box>
    </Stack>
  )
}
