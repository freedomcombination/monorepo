import { FaLinkedin, FaXTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa6'

import { SocialLink } from './types'

export const foundation: SocialLink[] = [
  {
    id: 'twitter',
    label: 'X',
    icon: FaXTwitter,
    link: {
      en: 'https://x.com/FreedomCombin',
      tr: 'https://x.com/FreedomCombin',
      nl: 'https://x.com/FreedomCombin',
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
    id: 'linkedin',
    label: 'LinkedIn',
    icon: FaLinkedin,
    link: {
      en: 'https://www.linkedin.com/company/freedom-combination',
      tr: 'https://www.linkedin.com/company/freedom-combination',
      nl: 'https://www.linkedin.com/company/freedom-combination',
    },
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: FaYoutube,
    link: {
      en: 'https://www.youtube.com/@FreedomCombination',
      tr: 'https://www.youtube.com/@FreedomCombination',
      nl: 'https://www.youtube.com/@FreedomCombination',
    },
  },
]
