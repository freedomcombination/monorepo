import { FC } from 'react'

import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { BLOG_CATEGORIES } from '@fc/config'
import { Blog } from '@fc/types'
import { AnimatedBox, BlogCard, Container, Hero } from '@fc/ui'

export type WhyWeAreProps = {
  seo: NextSeoProps
  blogs: Blog[]
}

export const WhyWeAre: FC<WhyWeAreProps> = ({ seo, blogs }) => {
  const { t } = useTranslation()
  const { push, query } = useRouter()

  const currentCategory = (query.category as string) || BLOG_CATEGORIES.DEFAULT

  const categories = Object.values(BLOG_CATEGORIES)

  const handleCategory = (category: string) => {
    push(
      {
        pathname: '/why-we-are',
        query: { category },
      },
      undefined,
      // Fetch new categories from the client side
      { shallow: true },
    )
  }

  return (
    <>
      <Hero title={seo.title as string} image={'/images/blog-bg.jpeg'} />
      <Container display="flex" flexDirection="column" pt={8}>
        {/* TODO: Use radio cards for accessibility */}
        <Flex justify="flex-start" mb={8} overflowX="auto" whiteSpace="nowrap">
          {categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => handleCategory(category)}
              m={2}
              flexShrink={0}
              whiteSpace="nowrap"
              variant={currentCategory === category ? 'outline' : 'solid'}
              _hover={{
                color: 'primary.400',
                bg: 'blackAlpha.50',
              }}
            >
              {t(`trend-rights.${category}`)}
            </Button>
          ))}
        </Flex>

        {!blogs?.length && (
          <Stack minH="inherit" justify="center" align="center" spacing={8}>
            <Image h={200} src={'/images/no-blog.svg'} alt="no blog" />
            <Text textAlign="center" fontSize="lg">
              {t('blog-no-content')}
            </Text>
          </Stack>
        )}

        <Box flex="1">
          <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 3 }}>
            {blogs?.map((blog, index) => (
              <AnimatedBox
                key={index}
                directing="to-down"
                delay={index * 0.5}
                gridColumn={{
                  base: undefined,
                  lg: index === 0 ? 'span 2' : undefined,
                }}
                h="full"
              >
                <BlogCard isFeatured={index === 0} post={blog} />
              </AnimatedBox>
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  )
}
