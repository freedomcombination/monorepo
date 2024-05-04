import { useMemo } from 'react'

import { format } from 'date-fns'
import { useRouter } from 'next/router'

import {
  Activity,
  Art,
  Asset,
  Category,
  Course,
  CourseApplication,
  Hashtag,
  Mention,
  Post,
  Profile,
  Role,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
  User,
} from '@fc/types'
import { AssetsTracking } from '@fc/types/src/assets-tracking'

import { FormFields } from './types'

export const mapModelsToOptions = (
  models?: StrapiModel[],
  locale?: StrapiLocale,
) => models?.map(model => mapModelToOption(model, locale))

export const mapModelToOption = (
  model?: StrapiModel,
  locale?: StrapiLocale,
) => {
  if (!model) return { value: '', label: '' }

  const mention = model as Mention
  const user = model as User
  const profile = model as Profile
  const role = model as unknown as Role
  const modelWithLocalizedName = model as Category
  const asset = model as Asset
  const assetsTracking = model as AssetsTracking

  const localizedName = locale
    ? modelWithLocalizedName[`name_${locale}`]
    : 'name'
  const value = model.id.toString()
  let label = (model as StrapiTranslatableModel).title || ''

  // Mention
  if (mention.data && mention.username) {
    label = `@${mention.username}`
  }

  // User / Profile
  else if (user.email) {
    label = profile.name || user.username || user.email
  }

  // Role
  else if (role.nb_users != null) {
    label = role.name
  }

  // Category, Tag etc.
  else if (localizedName) {
    label = localizedName
  }

  // Asset
  else if (asset.sku) {
    label = asset.name
  }

  // Asset Tracking
  else if (assetsTracking.fromLocation) {
    label = `${assetsTracking?.asset?.name} - ${assetsTracking.fromLocation} > ${assetsTracking.toLocation} - ${assetsTracking.date}`
  }

  return { value, label }
}

export const useDefaultValues = <T extends StrapiModel>(
  model?: T | null,
  fields?: FormFields<T>,
) => {
  const activityModel = model as Activity
  const applicationModel = model as CourseApplication
  const artModel = model as Art
  const assetModel = model as Asset
  const assetTrackingModel = model as AssetsTracking
  const courseModel = model as Course
  const hashtagModel = model as Hashtag
  const postModel = model as Post
  const profileModel = model as Profile
  const userModel = model as User

  const { locale } = useRouter()

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
              label: m.username,
              value: m.id.toString(),
            })) || []
          break

        case 'jobs':
          defaults.jobs =
            profileModel.jobs?.map(j => ({
              label: j[`name_${locale}`],
              value: j.id.toString(),
            })) || []
          break

        case 'artist':
          defaults.artist = {
            label: `${artModel.artist?.name} (${artModel.artist?.email})`,
            value: artModel?.artist?.id.toString(),
          }
          break

        case 'hashtag':
          defaults.hashtag = {
            label: postModel.hashtag?.title,
            value: postModel.hashtag?.id.toString(),
          }
          break

        case 'platform':
          defaults.platform = {
            label: courseModel.platform?.[`name_${locale}`],
            value: courseModel.platform?.id.toString(),
          }
          break

        case 'peopleInCharge':
          defaults.peopleInCharge =
            assetModel?.peopleInCharge?.map(person => ({
              label: person.name,
              value: person.id.toString(),
            })) || []
          break

        case 'assignedTo':
          defaults.assignedTo = {
            label:
              assetTrackingModel?.assignedTo?.name ||
              assetTrackingModel?.assignedTo?.email,
            value: assetTrackingModel?.assignedTo?.id.toString(),
          }
          break

        case 'asset':
          defaults.asset = {
            label: assetTrackingModel?.asset?.name,
            value: assetTrackingModel?.asset?.id.toString(),
          }
          break

        case 'foundation':
          defaults.foundation = {
            label: assetModel.foundation?.name,
            value: assetModel.foundation?.id.toString(),
          }
          break
        case 'course':
          defaults.course = {
            label: applicationModel.course?.[`title_${locale}`],
            value: applicationModel.course?.id.toString(),
          }
          break

        case 'user':
          defaults.user = {
            label: profileModel.user?.email,
            value: profileModel.user?.id.toString(),
          }
          break

        case 'role':
          defaults.role = {
            label: userModel?.role?.name || '',
            value: userModel?.role?.id.toString(),
          }
          break

        case 'categories':
          defaults.categories =
            hashtagModel?.categories?.map(c => ({
              label: c[`name_${locale}`],
              value: c.id.toString(),
            })) || []
          break

        case 'platforms':
          defaults.platforms =
            activityModel?.platforms?.map(p => ({
              label: p[`name_${locale}`],
              value: p.id.toString(),
            })) || []
          break

        case 'tags':
          defaults.tags =
            postModel?.tags?.map(c => ({
              label: c[`name_${locale}`],
              value: c.id.toString(),
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
