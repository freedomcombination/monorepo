import { FC } from 'react'

import { Box, Grid, useBreakpointValue } from '@chakra-ui/react'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
} from '@fc/chakra'
import { useHashtagBySlug } from '@fc/services/hashtag/getHashtagBySlug'

import { PostSentenceRefDrawer } from './PostSentenceRefDrawer'
import { useHashtagContext } from '../HashtagProvider'
import { HashtagStats } from '../HashtagStats'
import { MentionList } from '../MentionList'
import { PostMakerTweetList } from '../PostMakerTweetCard'
import { TimelineTrendsTabs } from '../TimelineTrendsTabs'
import { TrendTabs } from '../TrendTabs'

type PostMakerProps = {
  isIosSafari?: boolean
}

export const PostMaker: FC<PostMakerProps> = ({ isIosSafari }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true

  const { mentionsDisclosure, trendsDisclosure, archiveDisclosure } =
    useHashtagContext()

  const hashtag = useHashtagBySlug()

  if (!hashtag) return null

  return (
    <>
      <Modal
        closeOnInteractOutside={true}
        open={!isMobile && mentionsDisclosure.open}
        onOpenChange={mentionsDisclosure.onToggle}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <MentionList />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        closeOnInteractOutside={true}
        open={!isMobile && trendsDisclosure.open}
        onOpenChange={trendsDisclosure.onToggle}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <TrendTabs />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer
        open={archiveDisclosure.open}
        onOpenChange={archiveDisclosure.onToggle}
        placement="end"
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody background={'gray.50'} p={4}>
            <PostSentenceRefDrawer />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isMobile && mentionsDisclosure.open}
        onOpenChange={mentionsDisclosure.onToggle}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <MentionList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        open={isMobile && trendsDisclosure.open}
        onOpenChange={trendsDisclosure.onToggle}
        placement={'bottom'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <TrendTabs />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Grid
        gap={2}
        gridTemplateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}
        h={{ base: 'auto', lg: 'calc(100vh - 130px)' }}
        alignItems="stretch"
      >
        <Box order={{ base: 1, lg: 0 }} h="inherit">
          <HashtagStats />
        </Box>
        {/* TODO: Skeleton */}
        {hashtag.posts ? (
          <Box order={{ base: 0, lg: 1 }} h={'inherit'} overflowY={'auto'}>
            <PostMakerTweetList
              posts={hashtag.posts}
              isIosSafari={Boolean(isIosSafari)}
            />
          </Box>
        ) : (
          <Skeleton />
        )}

        <Box order={{ base: 2, lg: 2 }} h={'inherit'} overflowY={'auto'}>
          <TimelineTrendsTabs />
        </Box>
      </Grid>
    </>
  )
}
