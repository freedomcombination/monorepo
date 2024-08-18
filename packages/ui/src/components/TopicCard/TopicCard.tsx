import { FC, useState } from 'react'

import {
  Badge,
  Box,
  ButtonGroup,
  HStack,
  Highlight,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { formatDistanceStrict } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { AiOutlineDelete, AiOutlineEyeInvisible } from 'react-icons/ai'
import {
  FaBookmark,
  FaRegBookmark,
  FaRegEye,
  FaRegShareFromSquare,
  FaRegThumbsUp,
} from 'react-icons/fa6'
import { useLocalStorage } from 'usehooks-ts'

import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@fc/chakra'
import { useAuthContext } from '@fc/context'
import { useDeleteModel, useRecommendTopic } from '@fc/services'
import { Post, RecommendedTopicCreateInput, TopicBase } from '@fc/types'

import { TopicCardButton } from './TopicCardButton'
import { TopicCardProps } from './types'
import { useFields, useSchema } from '../../hooks'
import { ActionTooltip } from '../ActionTooltip'
import { ModelCreateModal } from '../ModelCreateModal'
import { ShareButtons } from '../ShareButtons'
import { WConfirm, WConfirmProps } from '../WConfirm'
import { WImage } from '../WImage'

export const TopicCard: FC<TopicCardProps> = ({
  topic,
  searchKey,
  ...rest
}) => {
  const { user } = useAuthContext()
  const { t } = useTranslation()
  const fields = useFields()
  const schemas = useSchema()
  const time =
    topic.time && formatDistanceStrict(new Date(topic.time), new Date())
  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<TopicBase[]>(
    'bookmarks',
    [],
  )
  const type = topic.type ?? 'Topic'
  const deleteModelMutation = useDeleteModel('recommended-topics')
  const queryClient = useQueryClient()
  const toast = useToast()
  const { mutateAsync, isPending } = useRecommendTopic()
  const isBookmarked = bookmarksStorage?.some(t => t.url === topic.url)

  const handleBookmark = () => {
    if (isBookmarked) {
      const filteredBookmarks = bookmarksStorage?.filter(
        t => t.url !== topic.url,
      )
      setBookmarksStorage(filteredBookmarks)
    } else {
      const newBookmarks = [...(bookmarksStorage || []), topic]
      setBookmarksStorage(newBookmarks)
    }
  }

  const handleRecommend = async () => {
    if (type !== 'Topic') return
    await mutateAsync(topic as RecommendedTopicCreateInput, {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['topics'] })
      },
    })
    toast({
      title: 'Recommended',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  const handleView = () => {
    window.open(
      topic.url,
      '_blank, popupWindow',
      `height=500,width=800,left=${window.innerWidth / 3},top=${
        window.innerHeight / 2
      },resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=yes,directories=no, status=yes`,
    )
  }

  const postContent = {
    description: topic?.description,
    content: topic?.description,
    image: {
      url: topic?.image,
    },
  } as Post

  const [confirmState, setConfirmState] = useState<WConfirmProps>()
  const id = topic?.id as number
  const highlightStyle = {
    bg: 'yellow.200',
    rounded: 'md',
    color: 'black',
  }

  const onDelete = () => {
    const title = type === 'Topic' ? 'Delete News' : 'Hide'
    const description =
      type === 'Topic'
        ? 'Are you sure you want to delete this news?'
        : `Are you sure you want to hide this ${type}?`
    const text = type === 'Topic' ? 'Delete' : 'Hide'
    setConfirmState({
      isWarning: true,
      title,
      description,
      buttonText: text,
      onConfirm: async () => {
        if (type === 'Topic') {
          deleteModelMutation.mutate(
            { id },
            {
              onSuccess: () => {
                setConfirmState(undefined)
                rest.onDelete?.(topic.url)
              },
              onError: async errors => {
                console.error('Delete news error', errors)
              },
              onSettled: () => {
                queryClient.refetchQueries({ queryKey: ['topics'] })
              },
            },
          )
        } else {
          rest.onDelete?.(topic.url)
        }
        setConfirmState(undefined)
      },
    })
  }

  return (
    <Stack
      boxShadow="md"
      bg={'white'}
      rounded="md"
      direction={{ base: 'column', xl: 'row' }}
      overflow="hidden"
      backgroundImage={'url(/images/world-map.svg)'}
      backgroundPosition={{ base: 'bottom', xl: 'right' }}
      backgroundRepeat={'no-repeat'}
      gap={0}
    >
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}

      <Box pos={'relative'}>
        <Box
          w={{ base: 'full', xl: '400px' }}
          h={{ base: '200px', xl: '220px' }}
        >
          <WImage
            boxSize={'full'}
            src={topic.image}
            alt={topic.title}
            objectFit={'cover'}
            flexShrink={0}
            unoptimized
          />
        </Box>
        <HStack gap={1} pos="absolute" top={0} left={0} w={'full'} p={2}>
          <Badge
            bg={'black'}
            variant={'solid'}
            fontWeight={600}
            textTransform={'uppercase'}
          >
            {topic.publisher}
          </Badge>
          <Badge colorScheme={'primary'} variant={'solid'} fontWeight={600}>
            {time}
          </Badge>
        </HStack>
      </Box>

      <Stack gap={4} p={{ base: 4, xl: 6 }} overflow={'hidden'}>
        <Stack textAlign={{ base: 'center', xl: 'left' }} flex={1}>
          <Text fontSize="lg" fontWeight={600} lineClamp={{ xl: 1 }}>
            {searchKey ? (
              <Highlight query={searchKey} styles={highlightStyle}>
                {topic.title || ''}
              </Highlight>
            ) : (
              topic.title
            )}
          </Text>
          <Text maxW={1000} lineClamp={{ base: 5, xl: 3 }}>
            {searchKey ? (
              <Highlight query={searchKey} styles={highlightStyle}>
                {topic.description || ''}
              </Highlight>
            ) : (
              topic.description
            )}
          </Text>
        </Stack>
        <Stack overflowX={'auto'} align={{ base: 'center', xl: 'start' }}>
          <ButtonGroup overflowX={'auto'} justifyContent={'center'}>
            <ModelCreateModal<Post>
              title={t('create-post')}
              endpoint={'posts'}
              schema={schemas.posts!}
              fields={fields.posts!}
              model={postContent}
              buttonProps={{
                variant: 'ghost',
                colorScheme: 'gray',
              }}
            >
              <Box as="span" display={{ base: 'none', xl: 'inline' }}>
                {t('create-post')}
              </Box>
            </ModelCreateModal>

            <TopicCardButton
              onClick={() => handleView()}
              icon={<FaRegEye />}
              title="View"
              variant="ghost"
              colorScheme="gray"
            />

            <Popover positioning={{ placement: 'top' }}>
              <PopoverTrigger>
                <Box>
                  <TopicCardButton
                    onClick={() => null}
                    icon={<FaRegShareFromSquare />}
                    title="Share"
                    variant="ghost"
                    colorScheme="gray"
                  />
                </Box>
              </PopoverTrigger>
              <PopoverContent w="max-content">
                <PopoverArrow />
                <PopoverBody>
                  <ShareButtons
                    title={topic.title}
                    url={topic.url}
                    quote={topic.description || ''}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <TopicCardButton
              onClick={() => handleBookmark()}
              icon={<FaRegBookmark />}
              {...(isBookmarked && {
                icon: <FaBookmark color={'primary'} />,
              })}
              title={isBookmarked ? 'Remove' : 'Bookmark'}
              variant={'ghost'}
              colorScheme={isBookmarked ? 'red' : 'gray'}
            />

            <TopicCardButton
              isVisible={!!user && !topic.isRecommended}
              onClick={() => handleRecommend()}
              icon={<FaRegThumbsUp />}
              title="Recommend"
              disabled={isPending}
              variant={'ghost'}
              colorScheme={'gray'}
            />

            <ActionTooltip
              isVisible={!!user && topic?.isRecommended && !!id}
              label={type === 'Topic' ? 'Delete news' : `Hide ${type}`}
              hasArrow
              bg="primary.400"
            >
              <Box>
                <TopicCardButton
                  onClick={onDelete}
                  icon={
                    type === 'Topic' ? (
                      <AiOutlineDelete />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )
                  }
                  title={type === 'Topic' ? 'Delete' : 'Hide'}
                  variant="ghost"
                  colorScheme="red"
                />
              </Box>
            </ActionTooltip>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}
