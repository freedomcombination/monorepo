import { useMemo } from 'react'

import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import {
  Activity,
  Art,
  Asset,
  AssetsTracking,
  Blog,
  Course,
  CourseApplication,
  FormFields,
  Hashtag,
  Platform,
  Post,
  Profile,
  StrapiModel,
  User,
} from '@fc/types'

import { I18nNamespaces } from '../../@types/i18next'

export const useDefaultValues = <T extends StrapiModel>(
  model?: T | null,
  fields?: FormFields<T>,
) => {
  const activityModel = model as Activity
  const applicationModel = model as CourseApplication
  const artModel = model as Art
  const assetModel = model as Asset
  const assetTrackingModel = model as AssetsTracking
  const blogModel = model as Blog
  const courseModel = model as Course
  const hashtagModel = model as Hashtag
  const platformModel = model as Platform
  const postModel = model as Post
  const profileModel = model as Profile
  const userModel = model as User

  const { locale } = useRouter()

  const { t } = useTranslation()

  return useMemo(() => {
    if (!model || !fields) return {} as T

    const defaults = {} as any
    const { date, createdAt, updatedAt, publishedAt } = model as Activity

    const getDate = (date?: string | null, isDateTime?: boolean) =>
      date
        ? isDateTime
          ? new Date(date).toISOString().replace('Z', '')
          : format(new Date(date), 'yyyy-MM-dd')
        : ''

    const dateFields: Record<string, [string, string]> = {
      date: [getDate(date), getDate(date, true)],
      createdAt: [getDate(createdAt), getDate(createdAt, true)],
      updatedAt: [getDate(updatedAt), getDate(updatedAt, true)],
      publishedAt: [getDate(publishedAt), getDate(publishedAt, true)],
    }

    fields.forEach(field => {
      switch (field.name) {
        case 'date':
        case 'createdAt':
        case 'updatedAt':
        case 'publishedAt':
          if (field.type === 'date') {
            defaults[field.name] = dateFields[field.name as string][0]
          } else if (field.type === 'datetime-local') {
            defaults[field.name] = dateFields[field.name as string][1]
          }
          break

        case 'mentions':
          defaults.mentions =
            hashtagModel.mentions?.map(m => ({
              label: m.username || '',
              value: m.id.toString() || '',
            })) || []
          break

        case 'profileStatus':
          defaults.profileStatus = {
            label: t(
              profileModel.profileStatus as keyof I18nNamespaces['common'],
            ),
            value: profileModel.profileStatus || '',
          }
          break

        case 'jobs':
          defaults.jobs =
            profileModel.jobs?.map(j => ({
              label: j[`name_${locale}`] || '',
              value: j.id.toString() || '',
            })) || []
          break

        case 'artist':
          defaults.artist = {
            label: `${artModel.artist?.name} (${artModel.artist?.email})` || '',
            value: artModel?.artist?.id.toString() || '',
          }
          break

        case 'hashtag':
          defaults.hashtag = {
            label: postModel.hashtag?.title || '',
            value: postModel.hashtag?.id.toString() || '',
          }
          break

        case 'platform':
          defaults.platform = {
            label: courseModel.platform?.[`name_${locale}`] || '',
            value: courseModel.platform?.id.toString() || '',
          }
          break

        case 'peopleInCharge':
          defaults.peopleInCharge =
            assetModel?.peopleInCharge?.map(person => ({
              label: person.name || person.email || '',
              value: person.id.toString() || '',
            })) || []
          break

        case 'assignedTo':
          defaults.assignedTo = {
            label:
              assetTrackingModel?.assignedTo?.name ||
              assetTrackingModel?.assignedTo?.email ||
              '',
            value: assetTrackingModel?.assignedTo?.id.toString() || '',
          }
          break

        case 'asset':
          defaults.asset = {
            label: assetTrackingModel?.asset?.name || '',
            value: assetTrackingModel?.asset?.id.toString() || '',
          }
          break

        case 'foundation':
          defaults.foundation = {
            label: platformModel.foundation?.name || '',
            value: platformModel.foundation?.id.toString() || '',
          }
          break
        case 'course':
          defaults.course = {
            label: applicationModel.course?.[`title_${locale}`] || '',
            value: applicationModel.course?.id.toString() || '',
          }
          break

        case 'user':
          defaults.user = {
            label: profileModel.user?.email || '',
            value: profileModel.user?.id.toString() || '',
          }
          break

        case 'author':
          defaults.author = {
            label: blogModel.author?.name || '',
            value: blogModel?.id?.toString() || '',
          }
          break

        case 'role':
          defaults.role = {
            label: userModel?.role?.name || '',
            value: userModel?.role?.id.toString() || '',
          }
          break

        case 'categories':
          defaults.categories =
            hashtagModel?.categories?.map(c => ({
              label: c[`name_${locale}`] || '',
              value: c.id.toString() || '',
            })) || []
          break

        case 'platforms':
          defaults.platforms =
            activityModel?.platforms?.map(p => ({
              label: p[`name_${locale}`] || '',
              value: p.id.toString() || '',
            })) || []
          break

        case 'tags':
          defaults.tags =
            postModel?.tags?.map(c => ({
              label: c[`name_${locale}`] || '',
              value: c.id.toString() || '',
            })) || []
          break
        default:
          defaults[field.name] = model[field.name as keyof T] || undefined
          break
      }
    })

    return defaults
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, fields, locale])
}
