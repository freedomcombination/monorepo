import { useEffect, useMemo, useState } from 'react'

import { useTranslation } from 'next-i18next'
import {
  BsCashCoin,
  BsCashStack,
  BsCollection,
  BsCommand,
  BsTranslate,
} from 'react-icons/bs'
import { CgHashtag, CgProfile } from 'react-icons/cg'
import { FaTimeline } from 'react-icons/fa6'
import { FiActivity, FiUsers } from 'react-icons/fi'
import { GiHumanPyramid } from 'react-icons/gi'
import { HiOutlineNewspaper } from 'react-icons/hi'
import { IoPricetagsOutline } from 'react-icons/io5'
import { LuFileArchive } from 'react-icons/lu'
import {
  MdFoundation,
  MdOutlineCategory,
  MdOutlineFeedback,
  MdOutlineSpaceDashboard,
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

import { DashboardRoute } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { StrapiEndpoint } from '@fc/types'
import { makePlural } from '@fc/utils'

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
        label: t('dashboard'),
        link: '/',
        icon: <MdOutlineSpaceDashboard />,
        allowed: true,
      },
      {
        label: t('foundation'),
        icon: <MdFoundation />,
        submenu: [
          {
            label: t('foundation.general'),
            link: '/foundations',
            icon: <SiGeneralelectric />,
          },
          {
            label: t('foundation.assets'),
            link: '/assets',
            icon: <SiMaterialdesignicons />,
          },
        ],
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
        label: t('archive-contents'),
        icon: <LuFileArchive />,
        link: '/archive-contents',
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
        label: t('categories'),
        icon: <MdOutlineCategory />,
        link: '/categories',
      },
      {
        label: t('tags'),
        icon: <IoPricetagsOutline />,
        link: '/tags',
      },
      {
        label: t('news'),
        icon: <HiOutlineNewspaper />,

        submenu: [
          {
            label: t('news'),
            link: '/news',
            icon: <HiOutlineNewspaper />,
            // it seems topic is not ordinary strapi's model.
            // it has not findOne method, so i change canRead function's requirements.
            allowed: canRead('topic'),
          },
          {
            label: t('bookmarked-news'),
            link: '/news/bookmarks',
            icon: <TbBookmarks />,
            // if user cant read /news, he cant add local bookmarks...
            allowed: canRead('topic'),
          },
          {
            label: t('recommended-news'),
            link: '/news/recommended',
            icon: <TbThumbUp />,
            allowed: canRead('recommended-topics'),
          },
        ],
      },
      {
        label: t('timelines'),
        icon: <FaTimeline />,
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
        label: t('profiles'),
        link: '/profiles',
        icon: <CgProfile />,
      },
      {
        label: t('users'),
        icon: <FiUsers />,
        submenu: [
          {
            label: t('users'),
            link: '/users',
            icon: <FiUsers />,
            allowed: canRead('users-permissions/roles'),
          },
          {
            label: t('role'),
            link: '/roles',
            icon: <TbMilitaryRank />,
            allowed: canRead('users-permissions/roles'),
          },
        ],
      },
      {
        label: t('blogs'),
        icon: <TbWriting />,
        link: '/blogs',
      },
      {
        label: t('competitions'),
        link: '/competitions',
        icon: <BsCommand />,
      },
      {
        label: 'Donation',
        // NOTE: Page slug is different from endpoint
        link: '/donation',
        icon: <BsCashCoin />,
        allowed: true,
      },
      {
        label: t('donations'),
        link: '/donations',
        icon: <BsCashStack />,
        allowed: isAdmin,
      },
      {
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
  }, [menuRender, t, permissions, demoPermissions])

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
