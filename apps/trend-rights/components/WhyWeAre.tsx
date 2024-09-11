import { FC, useEffect, useMemo, useRef, useState } from 'react'

import {
  Button,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'

import { Blog } from '@fc/types'
import { Hero, AnimatedBox, BlogCard, Container } from '@fc/ui'

export type WhyWeAreProps = {
  seo: NextSeoProps
  blogs: Blog[]
  categories: string[]
}

export const WhyWeAre: FC<WhyWeAreProps> = ({ seo, blogs, categories }) => {
  const { t } = useTranslation()
  const { locale, query, push } = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const category = (query.category as string) || 'our-story'

  const filteredBlogs = useMemo(() => {
    if (!category) return blogs

    return blogs?.filter(blog =>
      blog?.categories?.some(cat => cat[`name_${locale}`] === category),
    )
  }, [category, blogs, locale])

  const handleCategory = (category: string) => {
    setSelectedCategory(category)
    push({
      pathname: '/why-we-are',
      query: { category },
    })
  }
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0
      }
    }, 0)
  }, [locale])

  return (
    <>
      <Hero title={seo.title as string} image={'/images/blog-bg.jpeg'} />
      <Container display="flex" flexDirection="column" pt={8}>
        <Flex justify="flex-start" mb={8} overflowX="auto" whiteSpace="nowrap">
          {categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => handleCategory(category)}
              m={2}
              flexShrink={0}
              whiteSpace="nowrap"
              variant={selectedCategory === category ? 'outline' : 'solid'}
              _hover={{
                color: 'primary.400',
                bg: 'blackAlpha.50',
              }}
            >
              {category}
            </Button>
          ))}
        </Flex>

        {!filteredBlogs?.length && (
          <Stack minH="inherit" justify="center" align="center" spacing={8}>
            <Image h={200} src={'/images/no-blog.svg'} alt="no blog" />
            <Text textAlign="center" fontSize="lg">
              {t('blog-no-content')}
            </Text>
          </Stack>
        )}

        <Box flex="1">
          <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 3 }}>
            {filteredBlogs?.map((blog, index) => (
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
