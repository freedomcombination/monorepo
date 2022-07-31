import {
  about,
  academy,
  activity,
  artStop,
  blog,
  club,
  contact,
  lotus,
  platform,
  privacy,
  samenvvv,
  terms,
  volunteer,
} from './routes'

export const wsvvrijheid = {
  headerMenu: [
    activity,
    {
      link: platform.link,
      en: platform.en,
      nl: platform.nl,
      tr: platform.tr,
      children: [lotus, artStop, samenvvv, academy],
    },
    blog,
    club,
    {
      link: '/',
      en: 'Wsvvrijheid',
      nl: 'Wsvvrijheid',
      tr: 'Wsvvrijheid',
      children: [volunteer, about, contact],
    },
  ],
  footerMenu: [
    {
      children: [lotus, artStop, samenvvv, academy],
      en: platform.en,
      nl: platform.nl,
      tr: platform.tr,
    },
    {
      children: [about, contact],
      en: 'Foundation',
      nl: 'Stichting',
      tr: 'Vakıf',
    },
    {
      children: [club, activity, volunteer],
      en: 'Menu',
      nl: 'Menu',
      tr: 'Menu',
    },
    {
      children: [terms, privacy],
      en: 'Support',
      nl: 'Steun',
      tr: 'Destek',
    },
  ],
  profileMenu: {
    isLoggedIn: false,
    menu: [
      {
        label: 'Profile',
        link: '/profile',
      },
    ],
    login: {
      label: 'Login',
      link: '/login',
    },
    logout: {
      label: 'Logout',
      onClick: () => alert('Logout'),
    },
    username: 'John Doe',
    userAvatar: 'https://placekitten.com/200/200',
  },
}
