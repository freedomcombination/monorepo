import type {
  Asset,
  AssetsTracking,
  Category,
  Mention,
  Profile,
  Role,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableModel,
  User,
} from '@fc/types'

const mapModelToOption = (model?: StrapiModel, locale?: StrapiLocale) => {
  if (!model) return { value: '', label: '' }

  const mention = model as Mention
  const user = model as User
  const profile = model as Profile
  const role = model as unknown as Role
  const modelWithLocalizedName = model as Category
  const asset = model as Asset
  const assetsTracking = model as AssetsTracking

  const localizedName = locale
    ? modelWithLocalizedName[`name_${locale}`] || profile.name
    : profile.name || 'unknown'

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

export const mapModelsToOptions = (
  models?: StrapiModel[],
  locale?: StrapiLocale,
) => models?.map(model => mapModelToOption(model, locale))
