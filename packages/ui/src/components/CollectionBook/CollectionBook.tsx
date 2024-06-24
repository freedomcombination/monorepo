import { ComponentProps, FC } from 'react'

import { Heading, VStack } from '@chakra-ui/react'
import { IFlipSetting } from 'react-pageflip/build/html-flip-book/settings'

import { CollectionPages } from './CollectionPages'
import FlipBook from './Flipbook'
import { Page } from './Page'
import { CollectionBookProps } from './types'
import { WImage } from '../WImage'

const defaultFlipboxProps: Partial<IFlipSetting> = {
  width: 500,
  height: 600,
  size: 'stretch',
  minWidth: 315,
  maxWidth: 1000,
  minHeight: 600,
  maxHeight: 600,
  maxShadowOpacity: 0.3,
  showCover: true,
}

const CollectionBook: FC<CollectionBookProps> = ({
  collection,
  logo,
  flipboxProps,
}) => {
  const pageBgGdarient = `linear(to-r, gray.100 0%, gray.50 5%, gray.50 95%, gray.100 100%)`
  const coverBgGdarient = `linear(to-r, gray.100 0%, gray.50 5%, gray.50 95%, gray.100 100%)`
  const flipboxOverrideProps = {
    ...defaultFlipboxProps,
    ...flipboxProps,
  } as ComponentProps<typeof FlipBook>

  return (
    <FlipBook {...flipboxOverrideProps}>
      {/* Cover */}
      <Page bgGradient={coverBgGdarient}>
        <VStack
          h="full"
          justify={'center'}
          p={8}
          spacing={8}
          textAlign="center"
        >
          <Heading size="3xl" color="primary.500">
            {collection.title}
          </Heading>

          <WImage
            rounded={'md'}
            aspectRatio={1}
            h="auto"
            src={logo || collection?.image?.url}
            alt="logo"
          />
        </VStack>
      </Page>

      {/* Pages */}
      <CollectionPages
        collection={collection}
        pageBgGdarient={pageBgGdarient}
      />

      {/* Back */}
      <Page bgGradient={coverBgGdarient}>
        {logo ? (
          <WImage ratio={1} maxH={300} mx="auto" src={logo} alt="logo" />
        ) : null}
      </Page>
    </FlipBook>
  )
}

export default CollectionBook
