import { FC } from 'react'

import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaCalendarDay, FaClock, FaEye, FaHeart } from 'react-icons/fa'

import { Blog } from '@fc/types'
import { getReadingTime } from '@fc/utils'

import { FormattedDate } from '../FormattedDate'
import { Navigate } from '../Navigate'
import { WImage } from '../WImage'

export type BlogCardProps = {
  post: Blog
  isFeatured?: boolean
}

export const BlogCard: FC<BlogCardProps> = ({ post, isFeatured }) => {
  const { locale } = useRouter()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const featured = isFeatured && !isMobile
  const readingTime = getReadingTime(post.content || '', locale)

  return (
    <Navigate
      {...(featured && { gridColumn: { lg: 'span 2' } })}
      {...(!featured && { display: 'flex' })}
      href={`/blog/${post.slug}`}
      h={'full'}
    >
      <Flex
        w={'full'}
        direction={'column'}
        shadow="base"
        pos="relative"
        bg="white"
        rounded="sm"
        overflow="hidden"
      >
        {post.image?.url && (
          <WImage
            alt={post.title}
            h={featured ? 450 : 200}
            src={post.image}
            ratio="twitter"
            flexShrink={0}
          />
        )}
        <Stack
          flex={1}
          rounded="sm"
          mx={{ base: 4, lg: 8 }}
          mb={{ base: 4, lg: 8 }}
          mt={-8}
          maxW={600}
          pos="relative"
          bg="white"
          spacing={4}
          p={featured ? 6 : 0}
          {...(featured && {
            pos: 'absolute',
            bottom: 8,
            right: 0,
            minW: '70%',
            mx: 0,
            mb: 0,
          })}
        >
          <Wrap
            justify={{ base: 'center', md: 'space-between' }}
            fontSize="sm"
            color="gray.500"
            {...(!featured && { p: 4 })}
          >
            <HStack>
              <HStack>
                <Icon as={FaCalendarDay} />
                <Text>
                  <FormattedDate date={post.publishedAt as string} />
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text>{readingTime}</Text>
              </HStack>
            </HStack>
            <HStack>
              {post.likes && (
                <HStack>
                  <Box as={FaHeart} color={post.isLiked ? 'red.500' : 'gray.500'} />
                  <Text>{post.likes}</Text>
                </HStack>
              )}
              {post.views && (
                <HStack>
                  <Box as={FaEye} />
                  <Text>{post.views}</Text>
                </HStack>
              )}
            </HStack>
          </Wrap>
          <Stack flex={1}>
            <Heading as="h3" size="md">
              {post.title}
            </Heading>
            <Text noOfLines={2} color={'gray.700'}>
              {post.description}
            </Text>
            {post.author?.name && (
              <Text
                textAlign={'right'}
                mt={'auto'}
                fontWeight={600}
                color={'gray.700'}
              >
                {post.author.name}
              </Text>
            )}
          </Stack>
        </Stack>
      </Flex>
    </Navigate>
  )
}
