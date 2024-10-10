import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { SocialLink } from './types'

export const trendRights: SocialLink[] = [
  {
    id: 'twitter',
    label: 'X',
    icon: FaXTwitter,
    link: {
      en: 'https://x.com/TrendRights_EN',
      tr: 'https://x.com/TrendRights_TR',
      nl: 'https://x.com/TrendRights_NL',
    },
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: FaWhatsapp,
    link: {
      en: 'https://api.whatsapp.com/send?phone=31687578056',
      tr: 'https://api.whatsapp.com/send?phone=31687578056',
      nl: 'https://api.whatsapp.com/send?phone=31687578056',
    },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    link: {
      en: 'https://instagram.com/trendrights',
      tr: 'https://instagram.com/trendrights',
      nl: 'https://instagram.com/trendrights',
    },
  },
]
