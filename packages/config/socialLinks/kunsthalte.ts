import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { SocialLink } from './types'

export const kunsthalte: SocialLink[] = [
  {
    id: 'twitter',
    label: 'X',
    icon: FaXTwitter,
    link: {
      en: 'https://x.com/kunsthalte',
      tr: 'https://x.com/kunsthalte',
      nl: 'https://x.com/kunsthalte',
    },
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: FaWhatsapp,
    link: {
      en: 'https://api.whatsapp.com/send?phone=31685221308',
      tr: 'https://api.whatsapp.com/send?phone=31685221308',
      nl: 'https://api.whatsapp.com/send?phone=31685221308',
    },
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    link: {
      en: 'https://instagram.com/kunsthalte',
      tr: 'https://instagram.com/kunsthalte',
      nl: 'https://instagram.com/kunsthalte',
    },
  },
  {
    id: 'youtube',
    label: 'Youtube',
    icon: FaYoutube,
    link: {
      en: 'https://www.youtube.com/@Kunsthalte',
      tr: 'https://www.youtube.com/@Kunsthalte',
      nl: 'https://www.youtube.com/@Kunsthalte',
    },
  },
]
