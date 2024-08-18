import { FC } from 'react'

import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'

import { Blog } from '@fc/types'

import { AnimatedBox } from '../AnimatedBox'
import { BlogCard } from '../BlogCard'
import { Container } from '../Container'
import { Hero } from '../Hero'

export type BlogTemplateProps = {
  seo: NextSeoProps
  blogs: Blog[]
}

export const BlogTemplate: FC<BlogTemplateProps> = ({ seo, blogs }) => {
  const { t } = useTranslation()

  if (!blogs.length) {
    return (
      <Stack minH="inherit" justify="center" align="center" gap={8}>
        <Image h={200} src={'/images/no-blog.svg'} alt="no blog" />
        <Text textAlign="center" fontSize="lg">
          {t('blog-no-content')}
        </Text>
      </Stack>
    )
  }

  return (
    <>
      <Hero title={seo.title as string} image={'/images/blog-bg.jpeg'} />
      <Container>
        <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 3 }}>
          {blogs.map((blog, index) => (
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
      </Container>
    </>
  )
}
