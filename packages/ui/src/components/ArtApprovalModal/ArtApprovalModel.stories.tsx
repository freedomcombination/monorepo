import { useDisclosure } from '@chakra-ui/react'
import { Box, Container } from '@chakra-ui/react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { Button } from '@fc/chakra'
import { ART_MOCKS, PROFILE_MOCKS } from '@fc/mocks'
import { UploadFile } from '@fc/types'

import { ArtApprovalModal } from './ArtApprovalModal'

const artMock = ART_MOCKS.data[0]

export default {
  component: ArtApprovalModal,
  title: 'Admin/ArtApprovalModal',
  args: {
    art: artMock,
    editor: PROFILE_MOCKS.data[0],
    artist: PROFILE_MOCKS.data[1],
    onSuccess: () => alert('Success!'),
  },
  decorators: [
    (Story: any) => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as Meta<typeof ArtApprovalModal>

type Story = StoryObj<typeof ArtApprovalModal>

const StoryWithHooks: StoryFn<typeof ArtApprovalModal> = args => {
  const { art, editor, artist } = args
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={onOpen} m={4}>
        {`Open Modal`}
      </Button>
      <ArtApprovalModal
        {...args}
        art={art}
        editor={editor}
        artist={artist}
        onClose={onClose}
        isOpen={open}
      />
    </Box>
  )
}

export const Default: Story = {
  render: StoryWithHooks,
}
export const LongDescription: Story = {
  render: StoryWithHooks,
  args: {
    art: {
      ...artMock,
      description_en: `Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.
      Orci convallis pulvinar urna fusce at purus neque nam leo? Suspendisse semper facilisi
      parturient sit euismod placerat. Orci ante luctus praesent torquent orci commodo aptent blandit.
      Placerat arcu dui potenti; nullam taciti taciti amet.`,
    },
  },
}

const verticalImages = [
  {
    ...artMock.image,
    url: 'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
  },
] as UploadFile[]

const horizontalImages = [
  {
    ...artMock.image,
    url: 'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
  },
] as UploadFile[]

export const VerticalArts: Story = {
  render: StoryWithHooks,
  args: {
    art: {
      ...artMock,
      image: verticalImages,
    },
  },
}
export const MultiVerticalArts: Story = {
  render: StoryWithHooks,
  args: {
    art: {
      ...artMock,
      image: verticalImages,
    },
  },
}
export const HorizontalArts: Story = {
  render: StoryWithHooks,
  args: {
    art: {
      ...artMock,
      image: horizontalImages,
    },
  },
}
export const MultiHorizontalArts: Story = {
  render: StoryWithHooks,
  args: {
    art: {
      ...artMock,
      image: horizontalImages,
    },
  },
}
