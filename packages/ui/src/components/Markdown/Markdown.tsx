/* eslint-disable react/display-name */
import { FC, HtmlHTMLAttributes } from 'react'

import { Link } from '@chakra-ui/next-js'
import { chakra } from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'

import { MarkdownProps } from './types'

const MarkdownComponents = {
  h1: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.h1
      fontWeight={600}
      textAlign="center"
      fontSize="3xl"
      my={8}
      {...props}
    />
  ),
  h2: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.h2
      fontWeight={600}
      fontSize="2xl"
      my={6}
      apply="mdx.h2"
      {...props}
    />
  ),
  h3: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.h3
      fontWeight={600}
      fontSize="xl"
      my={4}
      as="h3"
      apply="mdx.h3"
      {...props}
    />
  ),
  h4: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.h4
      fontWeight={600}
      fontSize="lg"
      my={4}
      as="h4"
      apply="mdx.h4"
      {...props}
    />
  ),
  hr: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.hr apply="mdx.hr" {...props} />
  ),
  strong: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.span fontWeight={600} {...props} />
  ),
  a: (props: any) => (
    <Link
      href={props.href as any}
      fontWeight={600}
      color="primary.500"
      _hover={{ color: 'primary.300' }}
    >
      {props.children}
    </Link>
  ),
  p: (props: HtmlHTMLAttributes<HTMLElement>) => <chakra.p mb={4} {...props} />,
  ul: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.ul my={6} ml={8} {...props} />
  ),
  ol: (props: HtmlHTMLAttributes<HTMLElement>) => (
    <chakra.ol apply="mdx.ul" {...props} />
  ),
  li: (props: HtmlHTMLAttributes<HTMLElement>) => <chakra.li {...props} />,
}

export const Markdown: FC<MarkdownProps> = ({ source }) => {
  if (!source) {
    console.warn('No source provided to Markdown component')

    return null
  }

  return <MDXRemote {...source} components={MarkdownComponents} />
}
