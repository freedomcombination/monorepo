import { useTranslation } from 'next-i18next'
import {
  BsCashCoin,
  BsCashStack,
  BsCollection,
  BsCommand,
  BsTranslate,
} from 'react-icons/bs'
import { CgHashtag } from 'react-icons/cg'
import { FiActivity, FiUsers } from 'react-icons/fi'
import { GiHumanPyramid } from 'react-icons/gi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import {
  MdOutlineFeedback,
  MdOutlineSpaceDashboard,
  MdOutlineSupervisorAccount,
  MdOutlineVolunteerActivism,
} from 'react-icons/md'
import {
  TbActivity,
  TbBookmarks,
  TbBrandTwitter,
  TbBrush,
  TbChecks,
  TbClock,
  TbThumbUp,
  TbTimeline,
  TbVolume,
  TbWriting,
  TbX,
} from 'react-icons/tb'

import { AdminNavItemProps } from './types'

export const useAdminNav = (): AdminNavItemProps[] => {
  const { t } = useTranslation()

  return [
    {
      label: t('dashboard'),
      link: '/',
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      label: t('translates'),
      icon: <BsTranslate />,
      submenu: [
        {
          label: t('activities'),
          link: '/translates?slug=activities',
          icon: <TbActivity />,
        },
        {
          label: t('announcements'),
          link: '/translates?slug=announcements',
          icon: <TbVolume />,
        },
        {
          label: t('arts'),
          link: '/translates?slug=arts',
          icon: <TbBrush />,
        },
        {
          label: t('collections'),
          link: '/translates?slug=collections',
          icon: <BsCollection />,
        },
        {
          label: t('hashtags'),
          link: '/translates?slug=hashtags',
          icon: <CgHashtag />,
        },
        {
          label: t('posts'),
          link: '/translates?slug=posts',
          icon: <TbBrandTwitter />,
        },
      ],
    },
    {
      label: t('activities'),
      icon: <FiActivity />,
      link: '/activities',
    },
    {
      label: t('arts'),
      icon: <TbBrush />,

      submenu: [
        {
          label: t('pending-arts'),
          link: '/arts?status=pending',
          icon: <TbClock />,
        },
        {
          label: t('approvedArts'),
          link: '/arts?status=approved',
          icon: <TbChecks />,
        },
        {
          label: t('rejected-arts'),
          link: '/arts?status=rejected',
          icon: <TbX />,
        },
      ],
    },
    {
      label: t('art.collections'),
      link: '/collections',
      icon: <BsCollection />,
    },
    {
      label: t('hashtags'),
      icon: <CgHashtag />,
      link: '/hashtags',
    },
    {
      label: t('hashtagPosts'),
      icon: <TbBrandTwitter />,
      link: '/posts',
    },
    {
      label: t('news'),
      icon: <HiOutlineNewspaper />,
      submenu: [
        {
          label: t('news'),
          link: '/news',
          icon: <HiOutlineNewspaper />,
        },
        {
          label: t('bookmarked-news'),
          link: '/news/bookmarks',
          icon: <TbBookmarks />,
        },
        {
          label: t('recommended-news'),
          link: '/news/recommended',
          icon: <TbThumbUp />,
        },
      ],
    },
    {
      label: t('timelines'),
      icon: <TbTimeline />,
      submenu: [
        {
          label: t('timelines'),
          link: '/timelines',
          icon: <GiHumanPyramid />,
        },
        {
          label: t('bookmarked-tweets'),
          link: '/timelines/bookmarks',
          icon: <TbBookmarks />,
        },
        {
          label: t('recommended-tweets'),
          link: '/timelines/recommended',
          icon: <TbThumbUp />,
        },
      ],
    },
    {
      label: t('courses'),
      link: '/courses',
      icon: <GiHumanPyramid />,
    },
    {
      label: t('volunteers'),
      link: '/volunteers',
      icon: <MdOutlineVolunteerActivism />,
    },
    {
      label: t('users'),
      link: '/users',
      icon: <FiUsers />,
    },
    {
      label: t('blogs'),
      icon: <TbWriting />,
      link: '/blogs',
    },
    {
      label: t('accounts'),
      link: '/accounts',
      icon: <MdOutlineSupervisorAccount />,
    },
    {
      label: t('competitions'),
      link: '/competitions',
      icon: <BsCommand />,
    },
    {
      label: 'Donation',
      link: '/donation',
      icon: <BsCashCoin />,
    },
    {
      label: t('donations'),
      link: '/donations',
      icon: <BsCashStack />,
    },
    {
      label: t('userFeedbacks'),
      link: '/user-feedbacks',
      icon: <MdOutlineFeedback />,
    },
  ]
}
