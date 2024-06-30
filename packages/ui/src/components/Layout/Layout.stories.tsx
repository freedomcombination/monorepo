import { StoryObj, StoryFn, Meta } from '@storybook/react'

import { Layout, LayoutProps } from './Layout'
import { FOOTER_MENU } from '../Footer'
import { HEADER_MENU } from '../Header'
import { Hero } from '../Hero'
import { SOCIAL_LINKS } from '../SocialButtons'

export default {
  component: Layout,
  title: 'Layout/Layout',
  args: {
    headerProps: {
      headerMenu: HEADER_MENU,
      logo: 'https://freedomcombination.com/images/logo.svg',
    },
    footerProps: {
      menu: FOOTER_MENU,
      about: 'trend-rights',
      socialItems: SOCIAL_LINKS,
      logo: 'https://freedomcombination.com/images/logo.svg',
    },
  },
} as Meta<LayoutProps>

type Story = StoryObj<LayoutProps>

export const Default: Story = {}

const StoryWithHero: StoryFn<LayoutProps> = args => (
  <Layout {...args}>
    <Hero
      title="Title"
      image="https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"
    />
  </Layout>
)

export const WithHero: Story = {
  render: StoryWithHero,
  args: {
    isDark: true,
  },
}
