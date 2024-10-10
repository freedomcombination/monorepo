import { useEffect, useMemo, useState } from 'react'

import { useTranslation } from 'next-i18next'
import {
  BsCashCoin,
  BsCashStack,
  BsCollection,
  BsTranslate,
} from 'react-icons/bs'
import { CgHashtag, CgProfile } from 'react-icons/cg'
import { FaTimeline } from 'react-icons/fa6'
import { FiActivity, FiUsers } from 'react-icons/fi'
import { GiHumanPyramid } from 'react-icons/gi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { LuFileArchive } from 'react-icons/lu'
import {
  MdFoundation,
  MdOutlineCategory,
  MdOutlineFeedback,
  MdOutlineNotificationsActive,
  MdOutlineSpaceDashboard,
  MdTranslate,
} from 'react-icons/md'
import { SiGeneralelectric, SiMaterialdesignicons } from 'react-icons/si'
import {
  TbActivity,
  TbBookmarks,
  TbBrandTwitter,
  TbBrush,
  TbChecks,
  TbClock,
  TbMilitaryRank,
  TbThumbUp,
  TbWriting,
  TbX,
} from 'react-icons/tb'

import { DashboardRoute } from '@fc/config/dashboardRoutes'
import { useAuthContext } from '@fc/context/auth'
import type { StrapiEndpoint } from '@fc/types'
import { makePlural } from '@fc/utils/permissions'

import { AdminNavItemProps } from './types'

export const useAdminNav = () => {
  const { t } = useTranslation()
  const [menuRender, setMenuRender] = useState(0)
  const { isLoading, demoPermissions, permissions, canRead, isAdmin } =
    useAuthContext()

  useEffect(() => {
    // this isLoading changes every time
    // if we render menuItems only when isLoading is false
    // menu wont flicker
    if (!isLoading) setMenuRender(Date.now())
  }, [isLoading])

  const menuItems = useMemo(() => {
    const menuItems: AdminNavItemProps[] = [
      {
        id: 'dashboard',
        label: t('dashboard'),
        link: '/',
        icon: <MdOutlineSpaceDashboard />,
        allowed: true,
      },
      {
        id: 'foundation',
        label: t('foundation'),
        icon: <MdFoundation />,
        submenu: [
          {
            id: 'foundation-general',
            label: t('foundation.general'),
            link: '/foundations',
            icon: <SiGeneralelectric />,
          },
          {
            id: 'foundation-assets',
            label: t('foundation.assets'),
            link: '/assets',
            icon: <SiMaterialdesignicons />,
          },
        ],
      },
      {
        id: 'translates',
        label: t('translates'),
        icon: <BsTranslate />,
        submenu: [
          {
            id: 'translates-activities',
            label: t('activities'),
            link: '/translates?slug=activities',
            icon: <TbActivity />,
          },
          {
            id: 'translates-collections',
            label: t('collections'),
            link: '/translates?slug=collections',
            icon: <BsCollection />,
          },
          {
            id: 'translates-hashtags',
            label: t('hashtags'),
            link: '/translates?slug=hashtags',
            icon: <CgHashtag />,
          },
          {
            id: 'translates-posts',
            label: t('posts'),
            link: '/translates?slug=posts',
            icon: <TbBrandTwitter />,
          },
          ...(process.env.NODE_ENV === 'development'
            ? [
                {
                  id: 'translates-locales',
                  label: 'Locales',
                  link: '/locales',
                  icon: <MdTranslate />,
                  allowed: true,
                },
              ]
            : []),
        ],
      },
      {
        id: 'archive-contents',
        label: t('archive-contents'),
        icon: <LuFileArchive />,
        link: '/archive-contents',
      },
      {
        id: 'activities',
        label: t('activities'),
        icon: <FiActivity />,
        link: '/activities',
      },
      {
        id: 'arts',
        label: t('arts'),
        icon: <TbBrush />,
        submenu: [
          {
            id: 'pending-arts',
            label: t('pending-arts'),
            link: '/arts?status=pending',
            icon: <TbClock />,
          },
          {
            id: 'approved-arts',
            label: t('approvedArts'),
            link: '/arts?status=approved',
            icon: <TbChecks />,
          },
          {
            id: 'rejected-arts',
            label: t('rejected-arts'),
            link: '/arts?status=rejected',
            icon: <TbX />,
          },
        ],
      },
      {
        id: 'art-collections',
        label: t('art.collections'),
        link: '/collections',
        icon: <BsCollection />,
      },
      {
        id: 'hashtags',
        label: t('hashtags'),
        icon: <CgHashtag />,
        link: '/hashtags',
      },
      {
        id: 'hashtag-posts',
        label: t('hashtagPosts'),
        icon: <TbBrandTwitter />,
        link: '/posts',
      },
      {
        id: 'categories',
        label: t('categories'),
        icon: <MdOutlineCategory />,
        link: '/categories',
      },
      {
        id: 'news',
        label: t('news'),
        icon: <HiOutlineNewspaper />,

        submenu: [
          {
            id: 'news-news',
            label: t('news'),
            link: '/news',
            icon: <HiOutlineNewspaper />,
            // it seems topic is not ordinary strapi's model.
            // it has not findOne method, so i change canRead function's requirements.
            allowed: canRead('topic'),
          },
          {
            id: 'news-bookmarked-news',
            label: t('bookmarked-news'),
            link: '/news/bookmarks',
            icon: <TbBookmarks />,
            // if user cant read /news, he cant add local bookmarks...
            allowed: canRead('topic'),
          },
          {
            id: 'news-recommended-news',
            label: t('recommended-news'),
            link: '/news/recommended',
            icon: <TbThumbUp />,
            allowed: canRead('recommended-topics'),
          },
        ],
      },
      {
        id: 'notifications',
        label: t('notifications'),
        icon: <MdOutlineNotificationsActive />,
        link: '/notifications',
      },
      {
        id: 'timelines',
        label: t('timelines'),
        icon: <FaTimeline />,
        submenu: [
          {
            id: 'timelines-timelines',
            label: t('timelines'),
            link: '/timelines',
            icon: <GiHumanPyramid />,
          },
          {
            id: 'timelines-bookmarked-tweets',
            label: t('bookmarked-tweets'),
            link: '/timelines/bookmarks',
            icon: <TbBookmarks />,
          },
          {
            id: 'timelines-recommended-tweets',
            label: t('recommended-tweets'),
            link: '/timelines/recommended',
            icon: <TbThumbUp />,
          },
        ],
      },
      {
        id: 'courses',
        label: t('courses'),
        link: '/courses',
        icon: <GiHumanPyramid />,
      },
      {
        id: 'profiles',
        label: t('profiles'),
        link: '/profiles',
        icon: <CgProfile />,
      },
      {
        id: 'users',
        label: t('users'),
        icon: <FiUsers />,
        submenu: [
          {
            id: 'users-users',
            label: t('users'),
            link: '/users',
            icon: <FiUsers />,
            allowed: canRead('users-permissions/roles'),
          },
          {
            id: 'users-roles',
            label: t('role'),
            link: '/roles',
            icon: <TbMilitaryRank />,
            allowed: canRead('users-permissions/roles'),
          },
        ],
      },
      {
        id: 'blogs',
        label: t('blogs'),
        icon: <TbWriting />,
        link: '/blogs',
      },
      {
        id: 'donation',
        label: 'Donation',
        // NOTE: Page slug is different from endpoint
        link: '/donation',
        icon: <BsCashCoin />,
        allowed: true,
      },
      {
        label: t('transactions'),
        icon: <BsCashStack />,
        submenu: [
          {
            label: t('course-payments'),
            link: '/payments',
            icon: <FiUsers />,
            allowed: isAdmin,
          },
          {
            label: t('donations'),
            link: '/donations',
            icon: <BsCashStack />,
            allowed: isAdmin,
          },
        ],
      },

      {
        id: 'user-feedbacks',
        label: t('user-feedbacks'),
        link: '/user-feedbacks',
        icon: <MdOutlineFeedback />,
      },
    ] as AdminNavItemProps[]

    const canReadByLink = (link?: DashboardRoute): boolean => {
      if (!link) return true
      const endpoint = link.match(/^\/([^/?]+)/)?.[1] as StrapiEndpoint

      return canRead(endpoint)
    }

    const mapAllowedMenu = (menuItem: AdminNavItemProps): AdminNavItemProps => {
      if (menuItem.allowed === true || menuItem.allowed === false)
        return menuItem

      if (menuItem.submenu && menuItem.submenu.length > 0) {
        const submenu = menuItem.submenu.map(mapAllowedMenu)

        return {
          ...menuItem,
          allowed: submenu.some(submenu => submenu.allowed),
          submenu,
        }
      } else {
        const allowed = canReadByLink(menuItem.link)

        return {
          ...menuItem,
          allowed,
        }
      }
    }

    const mappedMenuItems = menuItems.map(mapAllowedMenu)

    if (isAdmin) return mappedMenuItems

    const filterMenu = (menuItem: AdminNavItemProps): boolean => {
      if (menuItem.submenu && menuItem.submenu.length > 0) {
        menuItem.submenu = menuItem.submenu.filter(filterMenu)

        return menuItem.submenu.length > 0
      }

      return menuItem.allowed === true
    }

    return mappedMenuItems.filter(filterMenu)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, menuRender, t, permissions, demoPermissions])

  const collectMenusRelated = (endpoint: string): AdminNavItemProps[] => {
    const link = '/' + makePlural(endpoint)
    const result: AdminNavItemProps[] = []

    const addToResult = (item: AdminNavItemProps) => {
      if (item.submenu && item.submenu.length > 0) {
        item.submenu.forEach(addToResult)
      }

      if (item.link?.startsWith(link)) result.push(item)
    }

    menuItems.forEach(addToResult)

    return result
  }

  const hasPathPermission = (asPath: string): boolean => {
    const checkSubMenu = (item: AdminNavItemProps) => {
      if (item.submenu && item.submenu.length > 0)
        return item.submenu.some(checkSubMenu)

      if (!item.allowed || !item.link) return false

      return asPath.startsWith(item.link)
    }

    return menuItems.some(checkSubMenu)
  }

  return {
    navItems: menuItems,
    collectMenusRelated,
    hasPathPermission,
  }
}
