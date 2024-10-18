import React, { FC } from 'react'

import { Img, Text } from '@react-email/components'

import type { Art, StrapiLocale } from '@fc/types'
import { KeyValue } from '../../components/KeyValue'
import { getTranslate, TranslateFunc } from '../../utils/getTranslate'
import { EmailProvider } from './../../EmailProvider'

type ArtCreatedProps = {
  art?: Art
  t: TranslateFunc
}

const ArtCreated: FC<ArtCreatedProps> = ({
  art = {
    // if we gave default values we can easily see the design of mail from the preview
    artist: { name: 'artist name' },
    title_en: 'art title',
    title_nl: 'art title',
    title_tr: 'art title',
    image: [{ url: 'http://picsum.photos/200/300' }],
  } as Art,
  t = getTranslate('en').t,
}) => {
  const image = art.image?.[0]
  const locale = t() as StrapiLocale
  const artName =
    art[`title_${locale}`] || art.title_en || art.title_nl || art.title_tr

  return (
    <EmailProvider
      site={'kunsthalte'}
      preview={t('art-created.preview', { name: art.artist?.name })}
      heading={t('art-created.header', {
        art: artName,
        name: art.artist?.name,
      })}
    >
      <KeyValue title={t('art-name')}>
        <Text>{artName}</Text>
      </KeyValue>
      <KeyValue title={t('artist')}>
        <Text>{art.artist?.name}</Text>
      </KeyValue>
      <KeyValue title={t('art')} divider={false}>
        <Img
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            width: '200px',
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
          src={image?.formats?.small?.url || image?.url}
          alt={art.title_en}
        />
      </KeyValue>
      {/* TODO add link to art page */}
    </EmailProvider>
  )
}

export default ArtCreated
