import { FC, useState, useEffect } from 'react'

import { Button, Image, SimpleGrid, Stack, Text, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'

import { Blog } from '@fc/types'
import { Hero, AnimatedBox, BlogCard, Container } from '@fc/ui'

export type WhyWeAreProps = {
  seo: NextSeoProps
  blogs: Blog[]
}

export const WhyWeAre: FC<WhyWeAreProps> = ({ seo, blogs }) => {
  const { t } = useTranslation()
  const whyWeAreCategories = [
    { en: ['Our Story', 'Documentaries', 'General Activities', 'Books'] },
    { tr: ['Hayat Hikayemiz', 'Belgeseller', 'Genel Aktiviteler', 'Kitaplar'] },
    { nl: ['Ons Verhaal', 'Documentaires', 'Algemene Activiteiten', 'Boeken'] },
  ]

  const [category, setCategory] = useState<string>('')
  const [filteredBlogs, setFilteredBlogs] = useState(blogs)

  const { locale } = useRouter()

  // Filtering blogs by category name
  const getBlogs = (category: string) => {
    return blogs.filter(blog =>
      blog?.categories?.some(cat => cat[`name_${locale}`] === category),
    )
  }

  useEffect(() => {
    if (!category) {
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs(getBlogs(category))
    }
  }, [category, blogs, locale])

  const handleCategory = (category: string) => {
    setCategory(category)
  }

  return (
    <>
      <Hero title={seo.title as string} image={'/images/blog-bg.jpeg'} />

      <Container display="flex" flexDirection="row" pt={8}>
        {!filteredBlogs.length && (
          <Stack minH="inherit" justify="center" align="center" spacing={8}>
            <Image h={200} src={'/images/no-blog.svg'} alt="no blog" />
            <Text textAlign="center" fontSize="lg">
              {t('blog-no-content')}
            </Text>
          </Stack>
        )}
        <Box flex="1" mr={{ base: 0, md: 8 }}>
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
        <Box as="aside" width={{ md: '1/4' }} position="sticky" top={8}>
          <Stack spacing={2}>
            {whyWeAreCategories &&
              whyWeAreCategories?.map((category, index) => (
                <Stack key={index} spacing={2}>
                  {category[locale]?.map((name, index) => (
                    <Button key={index} onClick={() => handleCategory(name)}>
                      {name}
                    </Button>
                  ))}
                </Stack>
              ))}
          </Stack>
        </Box>
      </Container>
    </>
  )
}
