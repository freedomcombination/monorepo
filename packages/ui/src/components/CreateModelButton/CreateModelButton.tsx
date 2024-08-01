import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { BsCollection } from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FaPlus } from 'react-icons/fa'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { IoPricetagsOutline } from 'react-icons/io5'
import { LuFileArchive } from 'react-icons/lu'
import {
  MdOutlineCastForEducation,
  MdOutlineCategory,
  MdOutlineNotificationsActive,
} from 'react-icons/md'
import { SiMaterialdesignicons } from 'react-icons/si'
import { TbActivity, TbBrandTwitter, TbWriting } from 'react-icons/tb'

import { useAuthContext } from '@fc/context'
import {
  Activity,
  ArchiveContent,
  Asset,
  Blog,
  Category,
  Collection,
  Course,
  Hashtag,
  Notification,
  Post,
  RecommendedTopic,
  RecommendedTweet,
  Tag,
} from '@fc/types'

import { useFields, useSchema } from '../../hooks'
import { ActionStack } from '../ActionStack'
import { CreatePostFromCapsModal } from '../CreatePostFromCapsModal'
import { ModelCreateModal } from '../ModelCreateModal'

export const CreateModelButton = () => {
  const { t } = useTranslation()
  const {
    isOpen: isOpenPost,
    onOpen: onOpenPost,
    onClose: onClosePost,
  } = useDisclosure()

  const fields = useFields()
  const schemas = useSchema()

  const { user } = useAuthContext()

  if (!user) return null

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          colorScheme={'primary'}
          rounded={'full'}
          aria-label="create"
          // leftIcon={<FaPlus />}
          iconSpacing={{ base: 0, lg: 2 }}
          px={{ base: 2, lg: 4 }}
        >
          <Text display={{ base: 'none', lg: 'block' }}>{t('create')}</Text>
        </Button>
      </PopoverTrigger>
      <Portal>
        <Box pos={'relative'} zIndex={'popover'}>
          <PopoverContent>
            <PopoverArrow />

            <PopoverBody>
              <Stack>
                <ModelCreateModal<ArchiveContent>
                  title={t('create-archive-content')}
                  endpoint="archive-contents"
                  schema={schemas['archive-contents']!}
                  fields={fields['archive-contents']!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <LuFileArchive />,
                  }}
                >
                  {t('create-archive-content')}
                </ModelCreateModal>

                <ModelCreateModal<Activity>
                  title={t('create-activity')}
                  endpoint="activities"
                  schema={schemas.activities!}
                  fields={fields.activities!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <TbActivity />,
                  }}
                >
                  {t('create-activity')}
                </ModelCreateModal>

                <ModelCreateModal<Asset>
                  title={t('create-asset')}
                  endpoint="assets"
                  schema={schemas.assets!}
                  fields={fields.assets!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <SiMaterialdesignicons />,
                  }}
                >
                  {t('create-asset')}
                </ModelCreateModal>

                <ModelCreateModal<Blog>
                  title={t('create-blog')}
                  endpoint="blogs"
                  schema={schemas.blogs!}
                  fields={fields.blogs!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <TbWriting />,
                  }}
                >
                  {t('create-blog')}
                </ModelCreateModal>

                <ModelCreateModal<Course>
                  title={t('create-course')}
                  endpoint="courses"
                  schema={schemas.courses!}
                  fields={fields.courses!}
                  shouldPublish
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <MdOutlineCastForEducation />,
                  }}
                >
                  {t('create-course')}
                </ModelCreateModal>

                <ModelCreateModal<Collection>
                  title={t('create-collection')}
                  endpoint="collections"
                  schema={schemas.collections!}
                  fields={fields.collections!}
                  shouldPublish
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <BsCollection />,
                  }}
                >
                  {t('create-collection')}
                </ModelCreateModal>

                <ModelCreateModal<Hashtag>
                  title={t('create-hashtag')}
                  endpoint="hashtags"
                  schema={schemas.hashtags!}
                  fields={fields.hashtags!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <CgHashtag />,
                  }}
                >
                  {t('create-hashtag')}
                </ModelCreateModal>

                <ModelCreateModal<Post>
                  title={t('create-post')}
                  endpoint="posts"
                  schema={schemas.posts!}
                  fields={fields.posts!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <TbBrandTwitter />,
                  }}
                >
                  {t('create-post')}
                </ModelCreateModal>

                <ActionStack canCreate="posts">
                  <CreatePostFromCapsModal
                    isOpen={isOpenPost}
                    onClose={onClosePost}
                  />
                  <Button
                    colorScheme="green"
                    variant="outline"
                    onClick={onOpenPost}
                  >
                    {t('create-multiple-post')}
                  </Button>
                </ActionStack>

                <ModelCreateModal<Category>
                  title={t('categories')}
                  endpoint="categories"
                  schema={schemas['categories']!}
                  fields={fields['categories']!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <MdOutlineCategory />,
                  }}
                >
                  {t('create-category')}
                </ModelCreateModal>

                <ModelCreateModal<Tag>
                  title={t('tags')}
                  endpoint="tags"
                  schema={schemas['tags']!}
                  fields={fields['tags']!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <IoPricetagsOutline />,
                  }}
                >
                  {t('create-tag')}
                </ModelCreateModal>

                <ModelCreateModal<Notification>
                  title={t('notifications')}
                  endpoint="notifications"
                  schema={schemas.notifications!}
                  fields={fields.notifications!}
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <MdOutlineNotificationsActive />,
                  }}
                >
                  {t('create-notification')}
                </ModelCreateModal>

                <ModelCreateModal<RecommendedTopic>
                  title={t('create-news')}
                  endpoint="recommended-topics"
                  schema={schemas.topic!}
                  fields={fields.topic!}
                  shouldPublish
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <HiOutlineNewspaper />,
                  }}
                >
                  {t('create-news')}
                </ModelCreateModal>

                <ModelCreateModal<RecommendedTweet>
                  title={t('create-recommended-tweet')}
                  endpoint="recommended-tweets"
                  schema={schemas['recommended-tweets']!}
                  fields={fields['recommended-tweets']!}
                  shouldPublish
                  buttonProps={{
                    variant: 'outline',
                    // leftIcon: <TbBrandTwitter />,
                  }}
                >
                  {t('create-recommended-tweet')}
                </ModelCreateModal>
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Portal>
    </Popover>
  )
}
