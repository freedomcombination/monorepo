import type { Schema, Attribute } from '@strapi/strapi'

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions'
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    properties: Attribute.JSON & Attribute.DefaultTo<{}>
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users'
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    username: Attribute.String
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    registrationToken: Attribute.String & Attribute.Private
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    preferedLanguage: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles'
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens'
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions'
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens'
  info: {
    name: 'Transfer Token'
    singularName: 'transfer-token'
    pluralName: 'transfer-tokens'
    displayName: 'Transfer Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions'
  info: {
    name: 'Transfer Token Permission'
    description: ''
    singularName: 'transfer-token-permission'
    pluralName: 'transfer-token-permissions'
    displayName: 'Transfer Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files'
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'File'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    alternativeText: Attribute.String
    caption: Attribute.String
    width: Attribute.Integer
    height: Attribute.Integer
    formats: Attribute.JSON
    hash: Attribute.String & Attribute.Required
    ext: Attribute.String
    mime: Attribute.String & Attribute.Required
    size: Attribute.Decimal & Attribute.Required
    url: Attribute.String & Attribute.Required
    previewUrl: Attribute.String
    provider: Attribute.String & Attribute.Required
    provider_metadata: Attribute.JSON
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders'
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Folder'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases'
  info: {
    singularName: 'release'
    pluralName: 'releases'
    displayName: 'Release'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    releasedAt: Attribute.DateTime
    scheduledAt: Attribute.DateTime
    timezone: Attribute.String
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions'
  info: {
    singularName: 'release-action'
    pluralName: 'release-actions'
    displayName: 'Release Action'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >
    contentType: Attribute.String & Attribute.Required
    locale: Attribute.String
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >
    isEntryValid: Attribute.Boolean
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale'
  info: {
    singularName: 'locale'
    pluralName: 'locales'
    collectionName: 'locales'
    displayName: 'Locale'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1
          max: 50
        },
        number
      >
    code: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions'
  info: {
    name: 'permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String & Attribute.Required
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles'
  info: {
    name: 'role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    description: Attribute.String
    type: Attribute.String & Attribute.Unique
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users'
  info: {
    name: 'user'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    provider: Attribute.String
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    confirmationToken: Attribute.String & Attribute.Private
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiAccountStatisticAccountStatistic
  extends Schema.CollectionType {
  collectionName: 'account_statistics'
  info: {
    singularName: 'account-statistic'
    pluralName: 'account-statistics'
    displayName: 'Account Statistic'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    username: Attribute.String
    followers: Attribute.Integer
    tweets: Attribute.Integer
    retweets: Attribute.Integer
    likes: Attribute.Integer
    followings: Attribute.Integer
    replies: Attribute.Integer
    date: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::account-statistic.account-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::account-statistic.account-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiActivityActivity extends Schema.CollectionType {
  collectionName: 'activities'
  info: {
    singularName: 'activity'
    pluralName: 'activities'
    displayName: 'Activity'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::activity.activity', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    place: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    categories: Attribute.Relation<
      'api::activity.activity',
      'oneToMany',
      'api::category.category'
    >
    platforms: Attribute.Relation<
      'api::activity.activity',
      'manyToMany',
      'api::platform.platform'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::activity.activity',
      'oneToMany',
      'api::activity.activity'
    >
    locale: Attribute.String
  }
}

export interface ApiArchiveContentArchiveContent extends Schema.CollectionType {
  collectionName: 'archive_contents'
  info: {
    singularName: 'archive-content'
    pluralName: 'archive-contents'
    displayName: 'Archive Content'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    date: Attribute.Date &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    source: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    link: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    categories: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToMany',
      'api::category.category'
    >
    victims: Attribute.Relation<
      'api::archive-content.archive-content',
      'manyToMany',
      'api::victim.victim'
    >
    prisons: Attribute.Relation<
      'api::archive-content.archive-content',
      'manyToMany',
      'api::prison.prison'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToMany',
      'api::archive-content.archive-content'
    >
    locale: Attribute.String
  }
}

export interface ApiArchiveImageArchiveImage extends Schema.CollectionType {
  collectionName: 'archive_images'
  info: {
    singularName: 'archive-image'
    pluralName: 'archive-images'
    displayName: 'Archive Image'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    categories: Attribute.Relation<
      'api::archive-image.archive-image',
      'oneToMany',
      'api::category.category'
    >
    image: Attribute.Media<'images'> & Attribute.Required
    victim: Attribute.Relation<
      'api::archive-image.archive-image',
      'manyToOne',
      'api::victim.victim'
    >
    prison: Attribute.Relation<
      'api::archive-image.archive-image',
      'manyToOne',
      'api::prison.prison'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::archive-image.archive-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::archive-image.archive-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiArtArt extends Schema.CollectionType {
  collectionName: 'arts'
  info: {
    singularName: 'art'
    pluralName: 'arts'
    displayName: 'Art'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title_tr: Attribute.String
    title_en: Attribute.String
    title_nl: Attribute.String
    slug: Attribute.UID<'api::art.art', 'title_nl'> & Attribute.Required
    description_tr: Attribute.Text & Attribute.DefaultTo<'Description'>
    description_en: Attribute.Text
    description_nl: Attribute.Text
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media<'images', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    likes: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Attribute.DefaultTo<0>
    views: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Attribute.DefaultTo<0>
    categories: Attribute.Relation<
      'api::art.art',
      'manyToMany',
      'api::category.category'
    >
    feedbacks: Attribute.Relation<
      'api::art.art',
      'oneToMany',
      'api::feedback.feedback'
    >
    collection: Attribute.Relation<
      'api::art.art',
      'manyToOne',
      'api::collection.collection'
    >
    comments: Attribute.Relation<
      'api::art.art',
      'oneToMany',
      'api::comment.comment'
    >
    likers: Attribute.Relation<
      'api::art.art',
      'manyToMany',
      'api::profile.profile'
    >
    artist: Attribute.Relation<
      'api::art.art',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::art.art', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::art.art', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiAssetAsset extends Schema.CollectionType {
  collectionName: 'assets'
  info: {
    singularName: 'asset'
    pluralName: 'assets'
    displayName: 'Asset'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: Attribute.String
    sku: Attribute.UID
    location: Attribute.String
    images: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>
    invoice: Attribute.Media<'files' | 'images'>
    platform: Attribute.Relation<
      'api::asset.asset',
      'manyToOne',
      'api::platform.platform'
    >
    peopleInCharge: Attribute.Relation<
      'api::asset.asset',
      'oneToMany',
      'api::profile.profile'
    >
    rules: Attribute.RichText
    notes: Attribute.RichText
    price: Attribute.Decimal
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiAssetsTrackingAssetsTracking extends Schema.CollectionType {
  collectionName: 'assets_trackings'
  info: {
    singularName: 'assets-tracking'
    pluralName: 'assets-trackings'
    displayName: 'AssetsTracking'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    fromLocation: Attribute.String
    toLocation: Attribute.String
    date: Attribute.Date
    notes: Attribute.Text
    asset: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'api::asset.asset'
    >
    previousTracking: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'api::assets-tracking.assets-tracking'
    >
    assignedTo: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiAuditLogAuditLog extends Schema.CollectionType {
  collectionName: 'audit_logs'
  info: {
    singularName: 'audit-log'
    pluralName: 'audit-logs'
    displayName: 'Audit Log'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    uid: Attribute.String
    text: Attribute.String
    profile: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'api::profile.profile'
    >
    modelId: Attribute.Integer
    action: Attribute.Enumeration<
      [
        'created',
        'updated',
        'deleted',
        'published',
        'unpublished',
        'approved',
        'rejected',
      ]
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs'
  info: {
    singularName: 'blog'
    pluralName: 'blogs'
    displayName: 'Blog'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::blog.blog', 'title'> & Attribute.Required
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    likes: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Attribute.DefaultTo<0>
    views: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Attribute.DefaultTo<0>
    categories: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::category.category'
    >
    comments: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::comment.comment'
    >
    likers: Attribute.Relation<
      'api::blog.blog',
      'manyToMany',
      'api::profile.profile'
    >
    author: Attribute.Relation<
      'api::blog.blog',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::blog.blog'
    >
    locale: Attribute.String
  }
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories'
  info: {
    singularName: 'category'
    pluralName: 'categories'
    displayName: 'Category'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    slug: Attribute.UID<'api::category.category', 'name_en'> &
      Attribute.Required
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    platforms: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::platform.platform'
    >
    arts: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::art.art'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCollectionCollection extends Schema.CollectionType {
  collectionName: 'collections'
  info: {
    singularName: 'collection'
    pluralName: 'collections'
    displayName: 'Collection'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::collection.collection', 'title'> &
      Attribute.Required
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    date: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    arts: Attribute.Relation<
      'api::collection.collection',
      'oneToMany',
      'api::art.art'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::collection.collection',
      'oneToMany',
      'api::collection.collection'
    >
    locale: Attribute.String
  }
}

export interface ApiCommentComment extends Schema.CollectionType {
  collectionName: 'comments'
  info: {
    singularName: 'comment'
    pluralName: 'comments'
    displayName: 'Comment'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    content: Attribute.Text & Attribute.Required
    name: Attribute.String
    email: Attribute.Email
    profile: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::profile.profile'
    >
    blog: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::blog.blog'
    >
    art: Attribute.Relation<'api::comment.comment', 'manyToOne', 'api::art.art'>
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses'
  info: {
    singularName: 'course'
    pluralName: 'courses'
    displayName: 'Course'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title_en: Attribute.String
    title_tr: Attribute.String
    title_nl: Attribute.String
    slug: Attribute.UID<'api::course.course', 'title_en'>
    description_en: Attribute.Text
    description_tr: Attribute.Text
    description_nl: Attribute.Text
    content_en: Attribute.RichText
    content_tr: Attribute.RichText
    content_nl: Attribute.RichText
    location: Attribute.String
    language: Attribute.Enumeration<['en', 'tr', 'nl']>
    instructor: Attribute.String
    price: Attribute.Integer
    quota: Attribute.Integer
    isOnline: Attribute.Boolean
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    approvalStatus: Attribute.Enumeration<['approved', 'pending', 'rejected']>
    startDate: Attribute.Date
    endDate: Attribute.Date
    applications: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::course-application.course-application'
    >
    platform: Attribute.Relation<
      'api::course.course',
      'manyToOne',
      'api::platform.platform'
    >
    faqs: Attribute.Component<'faq.faq', true>
    curriculum: Attribute.Component<'course.curriculum', true>
    lastRegisterDate: Attribute.DateTime
    requireApproval: Attribute.Boolean & Attribute.DefaultTo<false>
    assignmentFiles: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >
    assignmentSubmissionDeadline: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Attribute.DefaultTo<2>
    assignmentEvaluationTime: Attribute.Integer & Attribute.DefaultTo<2>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCourseApplicationCourseApplication
  extends Schema.CollectionType {
  collectionName: 'course_applications'
  info: {
    singularName: 'course-application'
    pluralName: 'course-applications'
    displayName: 'CourseApplication'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: Attribute.String
    email: Attribute.Email
    city: Attribute.String
    country: Attribute.String
    phone: Attribute.String
    message: Attribute.Text
    hasPaid: Attribute.Boolean
    approvalStatus: Attribute.Enumeration<['approved', 'pending', 'rejected']> &
      Attribute.DefaultTo<'pending'>
    course: Attribute.Relation<
      'api::course-application.course-application',
      'manyToOne',
      'api::course.course'
    >
    notes: Attribute.Text
    paymentExplanation: Attribute.String
    profile: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'api::profile.profile'
    >
    installmentCount: Attribute.Integer
    payments: Attribute.Relation<
      'api::course-application.course-application',
      'oneToMany',
      'api::payment.payment'
    >
    installmentStartAfter: Attribute.Date
    installmentInterval: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      > &
      Attribute.DefaultTo<1>
    submittedAssignmentFiles: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >
    lastUpdateDate: Attribute.DateTime
    discount: Attribute.Decimal
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiDonateDonate extends Schema.CollectionType {
  collectionName: 'donates'
  info: {
    singularName: 'donate'
    pluralName: 'donates'
    displayName: 'Donate'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    status: Attribute.String
    amount: Attribute.Decimal
    email: Attribute.Email
    name: Attribute.String
    phone: Attribute.String
    adddress: Attribute.Text
    checkoutSessionId: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::donate.donate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::donate.donate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiFeedbackFeedback extends Schema.CollectionType {
  collectionName: 'feedbacks'
  info: {
    singularName: 'feedback'
    pluralName: 'feedbacks'
    displayName: 'Feedback'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    message: Attribute.Text & Attribute.Required
    point: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
          max: 10
        },
        number
      >
    status: Attribute.Enumeration<['approved', 'rejected']> & Attribute.Required
    art: Attribute.Relation<
      'api::feedback.feedback',
      'manyToOne',
      'api::art.art'
    >
    editor: Attribute.Relation<
      'api::feedback.feedback',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiFoundationFoundation extends Schema.CollectionType {
  collectionName: 'foundations'
  info: {
    singularName: 'foundation'
    pluralName: 'foundations'
    displayName: 'Foundation'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    email: Attribute.Email
    name: Attribute.String
    bank1: Attribute.String
    bank2: Attribute.String
    IBAN1: Attribute.UID
    IBAN2: Attribute.UID
    chairman: Attribute.String
    accountant: Attribute.String
    secretary: Attribute.String
    volunteers: Attribute.Relation<
      'api::foundation.foundation',
      'oneToMany',
      'api::profile.profile'
    >
    platforms: Attribute.Relation<
      'api::foundation.foundation',
      'oneToMany',
      'api::platform.platform'
    >
    contact: Attribute.Component<'contact.contact'>
    KVK: Attribute.String
    BIC: Attribute.String
    RSIN: Attribute.String
    policy_plan: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    substantive_financial_annual_report: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >
    remuneration_policy: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >
    about_en: Attribute.Blocks
    about_nl: Attribute.Blocks
    about_tr: Attribute.Blocks
    teams: Attribute.Relation<
      'api::foundation.foundation',
      'oneToMany',
      'api::team.team'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::foundation.foundation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::foundation.foundation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiHashtagHashtag extends Schema.CollectionType {
  collectionName: 'hashtags'
  info: {
    singularName: 'hashtag'
    pluralName: 'hashtags'
    displayName: 'Hashtag'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::hashtag.hashtag', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    hashtagDefault: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    hashtagExtra: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    tweets: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    categories: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::category.category'
    >
    mentions: Attribute.Relation<
      'api::hashtag.hashtag',
      'manyToMany',
      'api::mention.mention'
    >
    posts: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::post.post'
    >
    platform: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'api::platform.platform'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::hashtag.hashtag'
    >
    locale: Attribute.String
  }
}

export interface ApiJobJob extends Schema.CollectionType {
  collectionName: 'jobs'
  info: {
    singularName: 'job'
    pluralName: 'jobs'
    displayName: 'Job'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    slug: Attribute.UID<'api::job.job', 'name_en'> & Attribute.Required
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    platform: Attribute.Relation<
      'api::job.job',
      'manyToOne',
      'api::platform.platform'
    >
    info_tr: Attribute.Blocks
    info_nl: Attribute.Blocks
    info_en: Attribute.Blocks
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::job.job', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::job.job', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiMentionMention extends Schema.CollectionType {
  collectionName: 'mentions'
  info: {
    singularName: 'mention'
    pluralName: 'mentions'
    displayName: 'Mention'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    username: Attribute.UID & Attribute.Required
    data: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    categories: Attribute.Relation<
      'api::mention.mention',
      'oneToMany',
      'api::category.category'
    >
    hashtags: Attribute.Relation<
      'api::mention.mention',
      'manyToMany',
      'api::hashtag.hashtag'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::mention.mention',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::mention.mention',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::mention.mention',
      'oneToMany',
      'api::mention.mention'
    >
    locale: Attribute.String
  }
}

export interface ApiNotificationNotification extends Schema.CollectionType {
  collectionName: 'notifications'
  info: {
    singularName: 'notification'
    pluralName: 'notifications'
    displayName: 'Notification'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    title: Attribute.String
    message: Attribute.Text
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiObservationObservation extends Schema.CollectionType {
  collectionName: 'observations'
  info: {
    singularName: 'observation'
    pluralName: 'observations'
    displayName: 'Observation'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    content: Attribute.Text
    profile: Attribute.Relation<
      'api::observation.observation',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::observation.observation',
      'oneToOne',
      'api::profile.profile'
    >
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::observation.observation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::observation.observation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPaymentPayment extends Schema.CollectionType {
  collectionName: 'payments'
  info: {
    singularName: 'payment'
    pluralName: 'payments'
    displayName: 'Payment'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    paymentDatetime: Attribute.DateTime
    profile: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'api::profile.profile'
    >
    amount: Attribute.Decimal
    status: Attribute.String
    checkoutSessionId: Attribute.String
    email: Attribute.Email
    courseApplication: Attribute.Relation<
      'api::payment.payment',
      'manyToOne',
      'api::course-application.course-application'
    >
    installmentNumber: Attribute.Integer & Attribute.DefaultTo<0>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPlatformPlatform extends Schema.CollectionType {
  collectionName: 'platforms'
  info: {
    singularName: 'platform'
    pluralName: 'platforms'
    displayName: 'Platform'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    slug: Attribute.UID<'api::platform.platform', 'name_en'> &
      Attribute.Required
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    content_en: Attribute.RichText
    content_nl: Attribute.RichText
    content_tr: Attribute.RichText
    image: Attribute.Media<'images'>
    link: Attribute.String
    jobs: Attribute.Relation<
      'api::platform.platform',
      'oneToMany',
      'api::job.job'
    >
    courses: Attribute.Relation<
      'api::platform.platform',
      'oneToMany',
      'api::course.course'
    >
    activities: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::activity.activity'
    >
    volunteers: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::profile.profile'
    >
    foundation: Attribute.Relation<
      'api::platform.platform',
      'manyToOne',
      'api::foundation.foundation'
    >
    contact: Attribute.Component<'contact.contact'>
    assets: Attribute.Relation<
      'api::platform.platform',
      'oneToMany',
      'api::asset.asset'
    >
    categories: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::category.category'
    >
    teams: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::team.team'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::platform.platform',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::platform.platform',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts'
  info: {
    singularName: 'post'
    pluralName: 'posts'
    displayName: 'Post'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    capsStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    imageParams: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    image: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    twitterMedia: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    hashtag: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::hashtag.hashtag'
    >
    video: Attribute.Media<'videos'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    caps: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    videoUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    victim: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::victim.victim'
    >
    prison: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::prison.prison'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post.post'
    >
    locale: Attribute.String
  }
}

export interface ApiPresentationPresentation extends Schema.CollectionType {
  collectionName: 'presentations'
  info: {
    singularName: 'presentation'
    pluralName: 'presentations'
    displayName: 'Presentation'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::presentation.presentation', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    date: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    address: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    place: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    flow: Attribute.Component<'flow.flow', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    images: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::presentation.presentation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::presentation.presentation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::presentation.presentation',
      'oneToMany',
      'api::presentation.presentation'
    >
    locale: Attribute.String
  }
}

export interface ApiPrisonPrison extends Schema.CollectionType {
  collectionName: 'prisons'
  info: {
    singularName: 'prison'
    pluralName: 'prisons'
    displayName: 'Prison'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: Attribute.String
    slug: Attribute.UID<'api::prison.prison', 'name'>
    city: Attribute.String
    contents: Attribute.Relation<
      'api::prison.prison',
      'manyToMany',
      'api::archive-content.archive-content'
    >
    posts: Attribute.Relation<
      'api::prison.prison',
      'oneToMany',
      'api::post.post'
    >
    images: Attribute.Relation<
      'api::prison.prison',
      'oneToMany',
      'api::archive-image.archive-image'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::prison.prison',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::prison.prison',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPrivacyPrivacy extends Schema.SingleType {
  collectionName: 'privacies'
  info: {
    singularName: 'privacy'
    pluralName: 'privacies'
    displayName: 'Privacy'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::privacy.privacy', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::privacy.privacy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::privacy.privacy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::privacy.privacy',
      'oneToMany',
      'api::privacy.privacy'
    >
    locale: Attribute.String
  }
}

export interface ApiProfileProfile extends Schema.CollectionType {
  collectionName: 'profiles'
  info: {
    singularName: 'profile'
    pluralName: 'profiles'
    displayName: 'Profile'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    email: Attribute.Email & Attribute.Required & Attribute.Unique
    bio: Attribute.Text
    phone: Attribute.String
    availableHours: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      > &
      Attribute.DefaultTo<1>
    heardFrom: Attribute.String
    comment: Attribute.Text
    linkedin: Attribute.String
    twitter: Attribute.String
    instagram: Attribute.String
    facebook: Attribute.String
    inMailingList: Attribute.Boolean & Attribute.DefaultTo<false>
    approved: Attribute.Boolean & Attribute.DefaultTo<false>
    isPublic: Attribute.Boolean & Attribute.DefaultTo<false>
    birthDate: Attribute.Date
    city: Attribute.String
    platforms: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::platform.platform'
    >
    avatar: Attribute.Media<'images'>
    isVolunteer: Attribute.Boolean
    likedArts: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::art.art'
    >
    ownedArts: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::art.art'
    >
    likedBlogs: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::blog.blog'
    >
    ownedBlogs: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::blog.blog'
    >
    comments: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::comment.comment'
    >
    feedbacks: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::feedback.feedback'
    >
    user: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'plugin::users-permissions.user'
    >
    jobs: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::job.job'
    >
    profileStatus: Attribute.Enumeration<
      [
        'pending',
        'accepted',
        'rejected',
        'in-progress',
        'left',
        'awaiting',
        'approved',
      ]
    > &
      Attribute.DefaultTo<'pending'>
    observations: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::observation.observation'
    >
    volunteerForm: Attribute.Media<'files'>
    subscriber: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'api::subscriber.subscriber'
    >
    cv: Attribute.Media<'images' | 'files'>
    address: Attribute.Component<'flow.address'>
    locale: Attribute.Enumeration<['en', 'tr', 'nl']>
    teams: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::team.team'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiRecommendedTopicRecommendedTopic
  extends Schema.CollectionType {
  collectionName: 'recommended_topics'
  info: {
    singularName: 'recommended-topic'
    pluralName: 'recommended-topics'
    displayName: 'Recommended Topic'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    image: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    url: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    category: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publisher: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    time: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    skipped: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<false>
    posted: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToMany',
      'api::recommended-topic.recommended-topic'
    >
    locale: Attribute.String
  }
}

export interface ApiRecommendedTweetRecommendedTweet
  extends Schema.CollectionType {
  collectionName: 'recommended_tweets'
  info: {
    singularName: 'recommended-tweet'
    pluralName: 'recommended-tweets'
    displayName: 'Recommended Tweet'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    text: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    isShared: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<false>
    originalTweet: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    mentions: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToMany',
      'api::mention.mention'
    >
    video: Attribute.Media<'videos'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    videoUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    caps: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToMany',
      'api::recommended-tweet.recommended-tweet'
    >
    locale: Attribute.String
  }
}

export interface ApiSubscriberSubscriber extends Schema.CollectionType {
  collectionName: 'subscribers'
  info: {
    singularName: 'subscriber'
    pluralName: 'subscribers'
    displayName: 'Subscriber'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    subscription: Attribute.JSON
    profile: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'api::profile.profile'
    >
    site: Attribute.Enumeration<
      ['dashboard', 'foundation', 'kunsthalte', 'lotus', 'trend-rights']
    > &
      Attribute.Required
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams'
  info: {
    singularName: 'team'
    pluralName: 'teams'
    displayName: 'team'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: Attribute.String
    platforms: Attribute.Relation<
      'api::team.team',
      'manyToMany',
      'api::platform.platform'
    >
    foundation: Attribute.Relation<
      'api::team.team',
      'manyToOne',
      'api::foundation.foundation'
    >
    description: Attribute.String
    members: Attribute.Relation<
      'api::team.team',
      'manyToOne',
      'api::profile.profile'
    >
    lead: Attribute.Relation<
      'api::team.team',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiTermTerm extends Schema.SingleType {
  collectionName: 'terms'
  info: {
    singularName: 'term'
    pluralName: 'terms'
    displayName: 'Term'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::term.term', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::term.term',
      'oneToMany',
      'api::term.term'
    >
    locale: Attribute.String
  }
}

export interface ApiTimelineTimeline extends Schema.CollectionType {
  collectionName: 'user_tweets'
  info: {
    singularName: 'timeline'
    pluralName: 'timelines'
    displayName: 'Timeline'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    username: Attribute.UID &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    userData: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    tweets: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::timeline.timeline',
      'oneToMany',
      'api::timeline.timeline'
    >
    locale: Attribute.String
  }
}

export interface ApiTopicTopic extends Schema.SingleType {
  collectionName: 'topics'
  info: {
    singularName: 'topic'
    pluralName: 'topics'
    displayName: 'Topic'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    data: Attribute.JSON
    isSyncing: Attribute.Boolean & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiTranslateTranslate extends Schema.CollectionType {
  collectionName: 'translates'
  info: {
    singularName: 'translate'
    pluralName: 'translates'
    displayName: 'Translate'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    mock: Attribute.Boolean
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::translate.translate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::translate.translate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiTrendTrend extends Schema.SingleType {
  collectionName: 'trends'
  info: {
    singularName: 'trend'
    pluralName: 'trends'
    displayName: 'Trend'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    en: Attribute.JSON
    nl: Attribute.JSON
    tr: Attribute.JSON
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::trend.trend',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::trend.trend',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiUserFeedbackUserFeedback extends Schema.CollectionType {
  collectionName: 'user_feedbacks'
  info: {
    singularName: 'user-feedback'
    pluralName: 'user-feedbacks'
    displayName: 'UserFeedback'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    comment: Attribute.Text
    point: Attribute.Integer
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    site: Attribute.String
    processed: Attribute.Boolean
    issueLink: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::user-feedback.user-feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::user-feedback.user-feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiUserNotificationUserNotification
  extends Schema.CollectionType {
  collectionName: 'user_notifications'
  info: {
    singularName: 'user-notification'
    pluralName: 'user-notifications'
    displayName: 'User Notification'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    notification: Attribute.Relation<
      'api::user-notification.user-notification',
      'oneToOne',
      'api::notification.notification'
    >
    profile: Attribute.Relation<
      'api::user-notification.user-notification',
      'oneToOne',
      'api::profile.profile'
    >
    read: Attribute.Boolean
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::user-notification.user-notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::user-notification.user-notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiVictimVictim extends Schema.CollectionType {
  collectionName: 'victims'
  info: {
    singularName: 'victim'
    pluralName: 'victims'
    displayName: 'Victim'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: Attribute.String
    slug: Attribute.UID<'api::victim.victim', 'name'>
    description_en: Attribute.Text
    birthDate: Attribute.Date
    incidentDate: Attribute.Date
    resolvedDate: Attribute.Date
    resolved: Attribute.Boolean
    deceased: Attribute.Boolean
    pregnant: Attribute.Boolean
    elderly: Attribute.Boolean
    baby: Attribute.Boolean
    noshare: Attribute.Boolean
    sick: Attribute.Boolean
    categories: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::category.category'
    >
    prisons: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::prison.prison'
    >
    contents: Attribute.Relation<
      'api::victim.victim',
      'manyToMany',
      'api::archive-content.archive-content'
    >
    posts: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::post.post'
    >
    images: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::archive-image.archive-image'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission
      'admin::user': AdminUser
      'admin::role': AdminRole
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::content-releases.release': PluginContentReleasesRelease
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
      'api::account-statistic.account-statistic': ApiAccountStatisticAccountStatistic
      'api::activity.activity': ApiActivityActivity
      'api::archive-content.archive-content': ApiArchiveContentArchiveContent
      'api::archive-image.archive-image': ApiArchiveImageArchiveImage
      'api::art.art': ApiArtArt
      'api::asset.asset': ApiAssetAsset
      'api::assets-tracking.assets-tracking': ApiAssetsTrackingAssetsTracking
      'api::audit-log.audit-log': ApiAuditLogAuditLog
      'api::blog.blog': ApiBlogBlog
      'api::category.category': ApiCategoryCategory
      'api::collection.collection': ApiCollectionCollection
      'api::comment.comment': ApiCommentComment
      'api::course.course': ApiCourseCourse
      'api::course-application.course-application': ApiCourseApplicationCourseApplication
      'api::donate.donate': ApiDonateDonate
      'api::feedback.feedback': ApiFeedbackFeedback
      'api::foundation.foundation': ApiFoundationFoundation
      'api::hashtag.hashtag': ApiHashtagHashtag
      'api::job.job': ApiJobJob
      'api::mention.mention': ApiMentionMention
      'api::notification.notification': ApiNotificationNotification
      'api::observation.observation': ApiObservationObservation
      'api::payment.payment': ApiPaymentPayment
      'api::platform.platform': ApiPlatformPlatform
      'api::post.post': ApiPostPost
      'api::presentation.presentation': ApiPresentationPresentation
      'api::prison.prison': ApiPrisonPrison
      'api::privacy.privacy': ApiPrivacyPrivacy
      'api::profile.profile': ApiProfileProfile
      'api::recommended-topic.recommended-topic': ApiRecommendedTopicRecommendedTopic
      'api::recommended-tweet.recommended-tweet': ApiRecommendedTweetRecommendedTweet
      'api::subscriber.subscriber': ApiSubscriberSubscriber
      'api::team.team': ApiTeamTeam
      'api::term.term': ApiTermTerm
      'api::timeline.timeline': ApiTimelineTimeline
      'api::topic.topic': ApiTopicTopic
      'api::translate.translate': ApiTranslateTranslate
      'api::trend.trend': ApiTrendTrend
      'api::user-feedback.user-feedback': ApiUserFeedbackUserFeedback
      'api::user-notification.user-notification': ApiUserNotificationUserNotification
      'api::victim.victim': ApiVictimVictim
    }
  }
}
