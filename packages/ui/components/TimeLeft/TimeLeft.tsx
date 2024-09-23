import { FC } from 'react'

import { Center, Heading, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { PostMakerIcon } from './PostMakerIcon'
import { useLocaleTimeFormat } from '../../hooks'

type TimeLeftProps = {
  date: string
}

const TimeLeft: FC<TimeLeftProps> = ({ date }) => {
  const { formattedDate, formattedDateDistance, timeZone } =
    useLocaleTimeFormat(date, 'dd MMMM HH:mm')

  const { t } = useTranslation()

  return (
    <Center minH={500}>
      <Stack
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={16}
        px={{ base: 4, lg: 16 }}
        maxW={700}
        rounded="lg"
        gap={2}
        bg="#9EDEF8"
        w="full"
      >
        <PostMakerIcon boxSize={300} />

        <Heading color="twitter.800" fontSize="2xl">
          {t('post.will-start', { time: formattedDateDistance })}
        </Heading>
        <Text>
          {formattedDate} ({timeZone})
        </Text>
      </Stack>
    </Center>
  )
}

export default TimeLeft
