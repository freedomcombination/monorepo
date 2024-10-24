import { FC } from 'react'

import { SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { ABOUT_DATA } from '@fc/config/data'
import type { Localize } from '@fc/types'
import { AnimatedBox } from '@fc/ui/components/AnimatedBox'
import { WImage } from '@fc/ui/components/WImage'

type AboutItem = {
  image: string
  title: Localize<string>
  description: Localize<string>
}

const HomeAboutItem: FC<{ item: AboutItem }> = ({ item }) => {
  const { locale } = useRouter()

  return (
    <VStack align="stretch" spacing={4}>
      <WImage
        rounded="full"
        alignSelf="center"
        boxSize={48}
        src={item.image}
        alt={item.title[locale]}
      />
      <Text fontSize="xl" fontWeight={600}>
        {item.title[locale]}
      </Text>
      <Text>{item.description[locale]}</Text>
    </VStack>
  )
}

export const HomeAbout = () => (
  <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} textAlign="center">
    {ABOUT_DATA.map((item, i) => (
      <AnimatedBox key={i} delay={i * 3} directing="to-down">
        <HomeAboutItem item={item} />
      </AnimatedBox>
    ))}
  </SimpleGrid>
)
