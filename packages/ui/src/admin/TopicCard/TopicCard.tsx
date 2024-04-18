import { FC, useState } from 'react'

import {
  Badge,
  Box,
  ButtonGroup,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { formatDistanceStrict } from 'date-fns'
import { useTranslation } from 'next-i18next'
import { AiOutlineDelete } from 'react-icons/ai'
import {
  FaBookmark,
  FaRegBookmark,
  FaRegEye,
  FaRegShareFromSquare,
  FaRegThumbsUp,
} from 'react-icons/fa6'
import { useLocalStorage } from 'usehooks-ts'

import { useAuthContext } from '@fc/context'
import { useDeleteModel, useRecommendTopic } from '@fc/services'
import { Post, RecommendedTopicCreateInput, TopicBase } from '@fc/types'

import { ActionButton } from './ActionButton'
import { TopicCardProps } from './types'
import { ShareButtons, WConfirm, WConfirmProps, WImage } from '../../components'
import { useFields, useSchema } from '../../data'
import { usePermission } from '../../hooks'
import { ModelCreateModal } from '../ModelForm'

export const TopicCard: FC<TopicCardProps> = ({ topic }) => {
  const { user } = useAuthContext()

  const { t } = useTranslation()

  const fields = useFields()
  const schemas = useSchema()

  const { allowEndpointAction } = usePermission()

  const time =
    topic.time && formatDistanceStrict(new Date(topic.time), new Date())

  const [bookmarksStorage, setBookmarksStorage] = useLocalStorage<TopicBase[]>(
    'bookmarks',
    [],
  )

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
    await mutateAsync(topic as RecommendedTopicCreateInput, {
      onSettled: () => queryClient.invalidateQueries({ queryKey: ['topics'] }),
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

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete News',
      description: 'Are you sure you want to delete this news?',
      buttonText: 'Delete',
      onConfirm: async () => {
        deleteModelMutation.mutate(
          { id },
          {
            onSuccess: () => {
              setConfirmState(undefined)
            },
            onError: async errors => {
              console.error('Delete news error', errors)
            },
          },
        )
        setConfirmState(undefined)
      },
    })
  }

  return (
    <Stack
      boxShadow="md"
      bg={'white'}
      rounded="md"
      align={{ base: 'stretch', xl: 'flex-start' }}
      direction={{ base: 'column', xl: 'row' }}
      overflow="hidden"
      backgroundImage={'url(/images/world-map.svg)'}
      backgroundPosition={{ base: 'bottom', xl: 'right' }}
      backgroundRepeat={'no-repeat'}
    >
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}

      <Box pos={'relative'}>
        <WImage
          w={{ base: 'full', xl: '400px' }}
          h={{ base: '200px', xl: '220px' }}
          src={topic.image}
          alt={topic.title}
          objectFit={'cover'}
          flexShrink={0}
          unoptimized
        />
        <HStack spacing={1} pos="absolute" top={0} left={0} w={'full'} p={2}>
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

      <Stack
        spacing={4}
        p={{ base: 4, xl: 6 }}
        flex={1}
        overflow={'hidden'}
        h="full"
      >
        <Stack textAlign={{ base: 'center', xl: 'left' }} flex={1}>
          <Text fontSize="lg" fontWeight={600} noOfLines={{ xl: 1 }}>
            {topic.title}
          </Text>
          <Text maxW={1000} noOfLines={{ base: 5, xl: 3 }}>
            {topic.description}
          </Text>
        </Stack>
        <Stack overflowX={'auto'} align={{ base: 'center', xl: 'start' }}>
          <ButtonGroup overflowX={'auto'} justifyContent={'center'}>
            {allowEndpointAction('posts', 'create') && (
              <ModelCreateModal<Post>
                title={t('create-post')}
                endpoint={'posts'}
                schema={schemas.posts!}
                fields={fields.posts!}
                model={postContent}
                buttonProps={{
                  variant: 'ghost',
                  colorScheme: 'gray',
                  iconSpacing: { base: 0, lg: 2 },
                }}
              >
                <Box as="span" display={{ base: 'none', xl: 'inline' }}>
                  {t('create-post')}
                </Box>
              </ModelCreateModal>
            )}
            <ActionButton
              onClick={() => handleView()}
              icon={<FaRegEye />}
              title="View"
              variant="ghost"
              colorScheme="gray"
            />

            <Popover placement="top">
              <PopoverTrigger>
                <Box>
                  <ActionButton
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

            <ActionButton
              onClick={() => handleBookmark()}
              icon={<FaRegBookmark />}
              {...(isBookmarked && {
                icon: <FaBookmark color={'primary'} />,
              })}
              title={isBookmarked ? 'Remove' : 'Bookmark'}
              variant={'ghost'}
              colorScheme={isBookmarked ? 'red' : 'gray'}
            />
            {user && (
              <ActionButton
                onClick={() => handleRecommend()}
                icon={<FaRegThumbsUp />}
                title="Recommend"
                disabled={topic.isRecommended || isPending}
                isDisabled={topic.isRecommended || isPending}
                variant={'ghost'}
                colorScheme={topic.isRecommended ? 'primary' : 'gray'}
              />
            )}
            {user && topic?.isRecommended && id && (
              <Tooltip label="Delete news" hasArrow bg="primary.400">
                <Box>
                  <ActionButton
                    onClick={onDelete}
                    icon={<AiOutlineDelete />}
                    title="Delete"
                    variant="ghost"
                    colorScheme="red"
                  />
                </Box>
              </Tooltip>
            )}
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}
