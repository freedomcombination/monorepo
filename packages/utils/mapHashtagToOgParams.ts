// Ref: https://javascript.info/task/delay-promise
import { tz } from '@date-fns/tz'
import { format } from 'date-fns'

import type { Hashtag, OgImageParams } from '@fc/types'

const capsContent = {
  en: { title: 'TAG ANNOUNCEMENT', topic: 'Topic' },
  nl: { title: 'TAG AANKONDIGING', topic: 'Onderwerp' },
  tr: { title: 'ETİKET DUYURUSU', topic: 'Konu' },
}

export const mapHashtagToOgParams = (hashtag: Hashtag): OgImageParams => {
  const newDate = new Date(hashtag.date)
  const locale = hashtag.locale

  const euDate = newDate ? format(newDate, 'dd MMMM yyyy') : ''
  const euTime = newDate
    ? format(newDate, 'HH:mm', { in: tz('Europe/Amsterdam') })
    : ''
  const trTime = newDate
    ? format(newDate, 'HH:mm', { in: tz('Europe/Istanbul') })
    : ''

  const TITLE = capsContent[locale].title
  const TOPIC = capsContent[locale].topic

  return {
    title: `📢 ${TITLE} 📢`,
    text: `📅 ${euDate}\n\n🇳🇱 ${euTime}\n🇹🇷 ${trTime}\n\n${TOPIC}: ${hashtag?.description}`,
    image: '/images/announcement.png',
    shape: 0,
    bg: 'white',
    color: 'black',
    flip: true,
    hasLine: true,
    scale: 0.5,
    platform: hashtag.platform?.slug as OgImageParams['platform'],
  }
}
