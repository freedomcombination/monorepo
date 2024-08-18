import { useState } from 'react'

import {
  Box,
  Center,
  Code,
  Grid,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { StoryFn, Meta, StoryObj } from '@storybook/react'
import { useRouter } from 'next/router'

import { Category } from '@fc/types'

import { ArtSideBar, ArtSideBarProps } from './ArtSideBar'

export default {
  component: ArtSideBar,
  title: 'Shared/ArtSideBar',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<ArtSideBarProps>

type Story = StoryObj<ArtSideBarProps>

const StoryWithHook: StoryFn<ArtSideBarProps> = args => {
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <ArtSideBar
          {...args}
          categoryList={
            [
              { id: 0, name_en: 'painting' },
              { id: 1, name_en: 'nature' },
            ] as Category[]
          }
          loading={args.loading || loading}
          setLoading={setLoading}
        />
      </Box>
      <Center>
        <VStack>
          <Heading size="md">Selected Categories</Heading>
          <HStack w="50%">
            <Code>{`Because of the storybook we can not observe the changes in router,
            but you can see that 'push' function of 'router' called with selected
            categories in Actions Tab below.`}</Code>
          </HStack>
          <HStack>
            <Code>
              {'initial categories: ' + JSON.stringify(query, null, 2)}
            </Code>
          </HStack>
        </VStack>
      </Center>
    </Grid>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}

export const InitialCategories: Story = {
  render: StoryWithHook,
  parameters: {
    nextjs: {
      router: {
        query: {
          categories: '0=painting&1=nature',
        },
      },
    },
  },
}
