import type { Attribute, Schema } from '@strapi/strapi'

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens'
  info: {
    description: ''
    displayName: 'Api Token'
    name: 'Api Token'
    pluralName: 'api-tokens'
    singularName: 'api-token'
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
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    expiresAt: Attribute.DateTime
    lastUsedAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'API Token Permission'
    name: 'API Token Permission'
    pluralName: 'api-token-permissions'
    singularName: 'api-token-permission'
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions'
  info: {
    description: ''
    displayName: 'Permission'
    name: 'Permission'
    pluralName: 'permissions'
    singularName: 'permission'
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
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    properties: Attribute.JSON & Attribute.DefaultTo<{}>
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles'
  info: {
    description: ''
    displayName: 'Role'
    name: 'Role'
    pluralName: 'roles'
    singularName: 'role'
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
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    description: Attribute.String
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
  }
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens'
  info: {
    description: ''
    displayName: 'Transfer Token'
    name: 'Transfer Token'
    pluralName: 'transfer-tokens'
    singularName: 'transfer-token'
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
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    expiresAt: Attribute.DateTime
    lastUsedAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Transfer Token Permission'
    name: 'Transfer Token Permission'
    pluralName: 'transfer-token-permissions'
    singularName: 'transfer-token-permission'
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users'
  info: {
    description: ''
    displayName: 'User'
    name: 'User'
    pluralName: 'users'
    singularName: 'user'
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
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    preferedLanguage: Attribute.String
    registrationToken: Attribute.String & Attribute.Private
    resetPasswordToken: Attribute.String & Attribute.Private
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    username: Attribute.String
  }
}

export interface ApiAccountStatisticAccountStatistic
  extends Schema.CollectionType {
  collectionName: 'account_statistics'
  info: {
    description: ''
    displayName: 'Account Statistic'
    pluralName: 'account-statistics'
    singularName: 'account-statistic'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::account-statistic.account-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    date: Attribute.String
    followers: Attribute.Integer
    followings: Attribute.Integer
    likes: Attribute.Integer
    replies: Attribute.Integer
    retweets: Attribute.Integer
    tweets: Attribute.Integer
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::account-statistic.account-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    username: Attribute.String
  }
}

export interface ApiActivityActivity extends Schema.CollectionType {
  collectionName: 'activities'
  info: {
    description: ''
    displayName: 'Activity'
    pluralName: 'activities'
    singularName: 'activity'
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
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    categories: Attribute.Relation<
      'api::activity.activity',
      'oneToMany',
      'api::category.category'
    >
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
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
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::activity.activity',
      'oneToMany',
      'api::activity.activity'
    >
    place: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    platforms: Attribute.Relation<
      'api::activity.activity',
      'manyToMany',
      'api::platform.platform'
    >
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::activity.activity', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiArchiveContentArchiveContent extends Schema.CollectionType {
  collectionName: 'archive_contents'
  info: {
    description: ''
    displayName: 'Archive Content'
    pluralName: 'archive-contents'
    singularName: 'archive-content'
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
    categories: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToMany',
      'api::category.category'
    >
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    date: Attribute.Date &
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
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToMany',
      'api::archive-content.archive-content'
    >
    prisons: Attribute.Relation<
      'api::archive-content.archive-content',
      'manyToMany',
      'api::prison.prison'
    >
    source: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::archive-content.archive-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    victims: Attribute.Relation<
      'api::archive-content.archive-content',
      'manyToMany',
      'api::victim.victim'
    >
  }
}

export interface ApiArchiveImageArchiveImage extends Schema.CollectionType {
  collectionName: 'archive_images'
  info: {
    description: ''
    displayName: 'Archive Image'
    pluralName: 'archive-images'
    singularName: 'archive-image'
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::archive-image.archive-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    image: Attribute.Media<'images'> & Attribute.Required
    prison: Attribute.Relation<
      'api::archive-image.archive-image',
      'manyToOne',
      'api::prison.prison'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::archive-image.archive-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    victim: Attribute.Relation<
      'api::archive-image.archive-image',
      'manyToOne',
      'api::victim.victim'
    >
  }
}

export interface ApiArtArt extends Schema.CollectionType {
  collectionName: 'arts'
  info: {
    description: ''
    displayName: 'Art'
    pluralName: 'arts'
    singularName: 'art'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.DefaultTo<'pending'>
    artist: Attribute.Relation<
      'api::art.art',
      'manyToOne',
      'api::profile.profile'
    >
    categories: Attribute.Relation<
      'api::art.art',
      'manyToMany',
      'api::category.category'
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::art.art', 'oneToOne', 'admin::user'> &
      Attribute.Private
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text & Attribute.DefaultTo<'Description'>
    feedbacks: Attribute.Relation<
      'api::art.art',
      'oneToMany',
      'api::feedback.feedback'
    >
    image: Attribute.Media<'images', true> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    likers: Attribute.Relation<
      'api::art.art',
      'manyToMany',
      'api::profile.profile'
    >
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
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::art.art', 'title_nl'> & Attribute.Required
    title_en: Attribute.String
    title_nl: Attribute.String
    title_tr: Attribute.String
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::art.art', 'oneToOne', 'admin::user'> &
      Attribute.Private
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
  }
}

export interface ApiAssetAsset extends Schema.CollectionType {
  collectionName: 'assets'
  info: {
    description: ''
    displayName: 'Asset'
    pluralName: 'assets'
    singularName: 'asset'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    images: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>
    invoice: Attribute.Media<'files' | 'images'>
    location: Attribute.String
    name: Attribute.String
    notes: Attribute.RichText
    peopleInCharge: Attribute.Relation<
      'api::asset.asset',
      'oneToMany',
      'api::profile.profile'
    >
    platform: Attribute.Relation<
      'api::asset.asset',
      'manyToOne',
      'api::platform.platform'
    >
    price: Attribute.Decimal
    rules: Attribute.RichText
    sku: Attribute.UID
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'AssetsTracking'
    pluralName: 'assets-trackings'
    singularName: 'assets-tracking'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    asset: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'api::asset.asset'
    >
    assignedTo: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    date: Attribute.Date
    fromLocation: Attribute.String
    notes: Attribute.Text
    previousTracking: Attribute.Relation<
      'api::assets-tracking.assets-tracking',
      'oneToOne',
      'api::assets-tracking.assets-tracking'
    >
    toLocation: Attribute.String
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Audit Log'
    pluralName: 'audit-logs'
    singularName: 'audit-log'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
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
    createdBy: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    modelId: Attribute.Integer
    profile: Attribute.Relation<
      'api::audit-log.audit-log',
      'oneToOne',
      'api::profile.profile'
    >
    text: Attribute.String
    uid: Attribute.String
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Blog'
    pluralName: 'blogs'
    singularName: 'blog'
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
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    author: Attribute.Relation<
      'api::blog.blog',
      'manyToOne',
      'api::profile.profile'
    >
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
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    likers: Attribute.Relation<
      'api::blog.blog',
      'manyToMany',
      'api::profile.profile'
    >
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
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::blog.blog'
    >
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::blog.blog', 'title'> & Attribute.Required
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private
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
  }
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories'
  info: {
    description: ''
    displayName: 'Category'
    pluralName: 'categories'
    singularName: 'category'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    arts: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::art.art'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    platforms: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::platform.platform'
    >
    slug: Attribute.UID<'api::category.category', 'name_en'> &
      Attribute.Required
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Collection'
    pluralName: 'collections'
    singularName: 'collection'
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
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    arts: Attribute.Relation<
      'api::collection.collection',
      'oneToMany',
      'api::art.art'
    >
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    date: Attribute.DateTime &
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
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::collection.collection',
      'oneToMany',
      'api::collection.collection'
    >
    slug: Attribute.UID<'api::collection.collection', 'title'> &
      Attribute.Required
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCommentComment extends Schema.CollectionType {
  collectionName: 'comments'
  info: {
    description: ''
    displayName: 'Comment'
    pluralName: 'comments'
    singularName: 'comment'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    art: Attribute.Relation<'api::comment.comment', 'manyToOne', 'api::art.art'>
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    blog: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::blog.blog'
    >
    content: Attribute.Text & Attribute.Required
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    email: Attribute.Email
    name: Attribute.String
    profile: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::profile.profile'
    >
    publishedAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::comment.comment',
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
    description: ''
    displayName: 'CourseApplication'
    pluralName: 'course-applications'
    singularName: 'course-application'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    approvalStatus: Attribute.Enumeration<['approved', 'pending', 'rejected']> &
      Attribute.DefaultTo<'pending'>
    city: Attribute.String
    country: Attribute.String
    course: Attribute.Relation<
      'api::course-application.course-application',
      'manyToOne',
      'api::course.course'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    discount: Attribute.Decimal
    email: Attribute.Email
    hasPaid: Attribute.Boolean
    installmentCount: Attribute.Integer
    installmentInterval: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      > &
      Attribute.DefaultTo<1>
    installmentStartAfter: Attribute.Date
    lastUpdateDate: Attribute.DateTime
    message: Attribute.Text
    name: Attribute.String
    notes: Attribute.Text
    paymentExplanation: Attribute.String
    payments: Attribute.Relation<
      'api::course-application.course-application',
      'oneToMany',
      'api::payment.payment'
    >
    phone: Attribute.String
    profile: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'api::profile.profile'
    >
    submittedAssignmentFiles: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses'
  info: {
    description: ''
    displayName: 'Course'
    pluralName: 'courses'
    singularName: 'course'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    applications: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::course-application.course-application'
    >
    approvalStatus: Attribute.Enumeration<['approved', 'pending', 'rejected']>
    assignmentEvaluationTime: Attribute.Integer & Attribute.DefaultTo<2>
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
    content_en: Attribute.RichText
    content_nl: Attribute.RichText
    content_tr: Attribute.RichText
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    curriculum: Attribute.Component<'course.curriculum', true>
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    endDate: Attribute.Date
    faqs: Attribute.Component<'faq.faq', true>
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    instructor: Attribute.String
    isOnline: Attribute.Boolean
    language: Attribute.Enumeration<['en', 'tr', 'nl']>
    lastRegisterDate: Attribute.DateTime
    location: Attribute.String
    platform: Attribute.Relation<
      'api::course.course',
      'manyToOne',
      'api::platform.platform'
    >
    price: Attribute.Integer
    publishedAt: Attribute.DateTime
    quota: Attribute.Integer
    requireApproval: Attribute.Boolean & Attribute.DefaultTo<false>
    slug: Attribute.UID<'api::course.course', 'title_en'>
    startDate: Attribute.Date
    title_en: Attribute.String
    title_nl: Attribute.String
    title_tr: Attribute.String
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiDevMailDevMail extends Schema.CollectionType {
  collectionName: 'dev_mails'
  info: {
    description: ''
    displayName: 'DevMail'
    pluralName: 'dev-mails'
    singularName: 'dev-mail'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::dev-mail.dev-mail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    groupDate: Attribute.DateTime
    html: Attribute.Text
    subject: Attribute.String
    to: Attribute.String
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::dev-mail.dev-mail',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiDonateDonate extends Schema.CollectionType {
  collectionName: 'donates'
  info: {
    description: ''
    displayName: 'Donate'
    pluralName: 'donates'
    singularName: 'donate'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    adddress: Attribute.Text
    amount: Attribute.Decimal
    checkoutSessionId: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::donate.donate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    email: Attribute.Email
    name: Attribute.String
    phone: Attribute.String
    status: Attribute.String
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Feedback'
    pluralName: 'feedbacks'
    singularName: 'feedback'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    art: Attribute.Relation<
      'api::feedback.feedback',
      'manyToOne',
      'api::art.art'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    editor: Attribute.Relation<
      'api::feedback.feedback',
      'manyToOne',
      'api::profile.profile'
    >
    message: Attribute.Text & Attribute.Required
    point: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          max: 10
          min: 1
        },
        number
      >
    status: Attribute.Enumeration<['approved', 'rejected']> & Attribute.Required
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Foundation'
    pluralName: 'foundations'
    singularName: 'foundation'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    about_en: Attribute.Blocks
    about_nl: Attribute.Blocks
    about_tr: Attribute.Blocks
    accountant: Attribute.String
    bank1: Attribute.String
    bank2: Attribute.String
    BIC: Attribute.String
    chairman: Attribute.String
    contact: Attribute.Component<'contact.contact'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::foundation.foundation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    email: Attribute.Email
    IBAN1: Attribute.UID
    IBAN2: Attribute.UID
    KVK: Attribute.String
    name: Attribute.String
    platforms: Attribute.Relation<
      'api::foundation.foundation',
      'oneToMany',
      'api::platform.platform'
    >
    policy_plan: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    remuneration_policy: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >
    RSIN: Attribute.String
    secretary: Attribute.String
    substantive_financial_annual_report: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::foundation.foundation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    volunteers: Attribute.Relation<
      'api::foundation.foundation',
      'oneToMany',
      'api::profile.profile'
    >
  }
}

export interface ApiHashtagHashtag extends Schema.CollectionType {
  collectionName: 'hashtags'
  info: {
    description: ''
    displayName: 'Hashtag'
    pluralName: 'hashtags'
    singularName: 'hashtag'
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
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    categories: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::category.category'
    >
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
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
    image: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::hashtag.hashtag'
    >
    mentions: Attribute.Relation<
      'api::hashtag.hashtag',
      'manyToMany',
      'api::mention.mention'
    >
    platform: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'api::platform.platform'
    >
    posts: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::post.post'
    >
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::hashtag.hashtag', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    tweets: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiJobJob extends Schema.CollectionType {
  collectionName: 'jobs'
  info: {
    description: ''
    displayName: 'Job'
    pluralName: 'jobs'
    singularName: 'job'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::job.job', 'oneToOne', 'admin::user'> &
      Attribute.Private
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    info_en: Attribute.Blocks
    info_nl: Attribute.Blocks
    info_tr: Attribute.Blocks
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    platform: Attribute.Relation<
      'api::job.job',
      'manyToOne',
      'api::platform.platform'
    >
    slug: Attribute.UID<'api::job.job', 'name_en'> & Attribute.Required
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::job.job', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiMentionMention extends Schema.CollectionType {
  collectionName: 'mentions'
  info: {
    description: ''
    displayName: 'Mention'
    pluralName: 'mentions'
    singularName: 'mention'
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
    categories: Attribute.Relation<
      'api::mention.mention',
      'oneToMany',
      'api::category.category'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::mention.mention',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    data: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    hashtags: Attribute.Relation<
      'api::mention.mention',
      'manyToMany',
      'api::hashtag.hashtag'
    >
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::mention.mention',
      'oneToMany',
      'api::mention.mention'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::mention.mention',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    username: Attribute.UID & Attribute.Required
  }
}

export interface ApiNotificationNotification extends Schema.CollectionType {
  collectionName: 'notifications'
  info: {
    description: ''
    displayName: 'Notification'
    pluralName: 'notifications'
    singularName: 'notification'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::notification.notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    message: Attribute.Text
    title: Attribute.String
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Observation'
    pluralName: 'observations'
    singularName: 'observation'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    content: Attribute.Text
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::observation.observation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    creator: Attribute.Relation<
      'api::observation.observation',
      'oneToOne',
      'api::profile.profile'
    >
    profile: Attribute.Relation<
      'api::observation.observation',
      'manyToOne',
      'api::profile.profile'
    >
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Payment'
    pluralName: 'payments'
    singularName: 'payment'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    amount: Attribute.Decimal
    checkoutSessionId: Attribute.String
    courseApplication: Attribute.Relation<
      'api::payment.payment',
      'manyToOne',
      'api::course-application.course-application'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    email: Attribute.Email
    installmentNumber: Attribute.Integer & Attribute.DefaultTo<0>
    paymentDatetime: Attribute.DateTime
    profile: Attribute.Relation<
      'api::payment.payment',
      'oneToOne',
      'api::profile.profile'
    >
    status: Attribute.String
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Platform'
    pluralName: 'platforms'
    singularName: 'platform'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    activities: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::activity.activity'
    >
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
    contact: Attribute.Component<'contact.contact'>
    content_en: Attribute.RichText
    content_nl: Attribute.RichText
    content_tr: Attribute.RichText
    courses: Attribute.Relation<
      'api::platform.platform',
      'oneToMany',
      'api::course.course'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::platform.platform',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    foundation: Attribute.Relation<
      'api::platform.platform',
      'manyToOne',
      'api::foundation.foundation'
    >
    image: Attribute.Media<'images'>
    jobs: Attribute.Relation<
      'api::platform.platform',
      'oneToMany',
      'api::job.job'
    >
    link: Attribute.String
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    slug: Attribute.UID<'api::platform.platform', 'name_en'> &
      Attribute.Required
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::platform.platform',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    volunteers: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::profile.profile'
    >
  }
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts'
  info: {
    description: ''
    displayName: 'Post'
    pluralName: 'posts'
    singularName: 'post'
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
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    caps: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    capsStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    description: Attribute.Text &
      Attribute.Required &
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
    image: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    imageParams: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post.post'
    >
    prison: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::prison.prison'
    >
    publishedAt: Attribute.DateTime
    twitterMedia: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    victim: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::victim.victim'
    >
    video: Attribute.Media<'videos'> &
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
  }
}

export interface ApiPresentationPresentation extends Schema.CollectionType {
  collectionName: 'presentations'
  info: {
    description: ''
    displayName: 'Presentation'
    pluralName: 'presentations'
    singularName: 'presentation'
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
    address: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::presentation.presentation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    date: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    description: Attribute.Text &
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
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
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
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::presentation.presentation',
      'oneToMany',
      'api::presentation.presentation'
    >
    place: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::presentation.presentation', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::presentation.presentation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPrisonPrison extends Schema.CollectionType {
  collectionName: 'prisons'
  info: {
    description: ''
    displayName: 'Prison'
    pluralName: 'prisons'
    singularName: 'prison'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    city: Attribute.String
    contents: Attribute.Relation<
      'api::prison.prison',
      'manyToMany',
      'api::archive-content.archive-content'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::prison.prison',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    images: Attribute.Relation<
      'api::prison.prison',
      'oneToMany',
      'api::archive-image.archive-image'
    >
    name: Attribute.String
    posts: Attribute.Relation<
      'api::prison.prison',
      'oneToMany',
      'api::post.post'
    >
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::prison.prison', 'name'>
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Privacy'
    pluralName: 'privacies'
    singularName: 'privacy'
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
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::privacy.privacy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    image: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::privacy.privacy',
      'oneToMany',
      'api::privacy.privacy'
    >
    slug: Attribute.UID<'api::privacy.privacy', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::privacy.privacy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiProfileProfile extends Schema.CollectionType {
  collectionName: 'profiles'
  info: {
    description: ''
    displayName: 'Profile'
    pluralName: 'profiles'
    singularName: 'profile'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    address: Attribute.Component<'flow.address'>
    approved: Attribute.Boolean & Attribute.DefaultTo<false>
    availableHours: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      > &
      Attribute.DefaultTo<1>
    avatar: Attribute.Media<'images'>
    bio: Attribute.Text
    birthDate: Attribute.Date
    city: Attribute.String
    comment: Attribute.Text
    comments: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::comment.comment'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    cv: Attribute.Media<'images' | 'files'>
    email: Attribute.Email & Attribute.Required & Attribute.Unique
    facebook: Attribute.String
    feedbacks: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::feedback.feedback'
    >
    heardFrom: Attribute.String
    inMailingList: Attribute.Boolean & Attribute.DefaultTo<false>
    instagram: Attribute.String
    isPublic: Attribute.Boolean & Attribute.DefaultTo<false>
    isVolunteer: Attribute.Boolean
    jobs: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::job.job'
    >
    likedArts: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::art.art'
    >
    likedBlogs: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::blog.blog'
    >
    linkedin: Attribute.String
    locale: Attribute.Enumeration<['en', 'tr', 'nl']>
    name: Attribute.String & Attribute.Required
    observations: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::observation.observation'
    >
    ownedArts: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::art.art'
    >
    ownedBlogs: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::blog.blog'
    >
    phone: Attribute.String
    platforms: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::platform.platform'
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
    subscriber: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'api::subscriber.subscriber'
    >
    twitter: Attribute.String
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    user: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'plugin::users-permissions.user'
    >
    volunteerForm: Attribute.Media<'files'>
  }
}

export interface ApiRecommendedTopicRecommendedTopic
  extends Schema.CollectionType {
  collectionName: 'recommended_topics'
  info: {
    description: ''
    displayName: 'Recommended Topic'
    pluralName: 'recommended-topics'
    singularName: 'recommended-topic'
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
    category: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
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
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToMany',
      'api::recommended-topic.recommended-topic'
    >
    posted: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<false>
    publisher: Attribute.String &
      Attribute.Required &
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
    time: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    url: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
  }
}

export interface ApiRecommendedTweetRecommendedTweet
  extends Schema.CollectionType {
  collectionName: 'recommended_tweets'
  info: {
    description: ''
    displayName: 'Recommended Tweet'
    pluralName: 'recommended-tweets'
    singularName: 'recommended-tweet'
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
    caps: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    image: Attribute.Media<'images'> &
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
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToMany',
      'api::recommended-tweet.recommended-tweet'
    >
    mentions: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToMany',
      'api::mention.mention'
    >
    originalTweet: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    text: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    video: Attribute.Media<'videos'> &
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
  }
}

export interface ApiSubscriberSubscriber extends Schema.CollectionType {
  collectionName: 'subscribers'
  info: {
    description: ''
    displayName: 'Subscriber'
    pluralName: 'subscribers'
    singularName: 'subscriber'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    profile: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'api::profile.profile'
    >
    site: Attribute.Enumeration<
      ['dashboard', 'foundation', 'kunsthalte', 'lotus', 'trend-rights']
    > &
      Attribute.Required
    subscription: Attribute.JSON
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::subscriber.subscriber',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiTermTerm extends Schema.SingleType {
  collectionName: 'terms'
  info: {
    description: ''
    displayName: 'Term'
    pluralName: 'terms'
    singularName: 'term'
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
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private
    image: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::term.term',
      'oneToMany',
      'api::term.term'
    >
    slug: Attribute.UID<'api::term.term', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiTimelineTimeline extends Schema.CollectionType {
  collectionName: 'user_tweets'
  info: {
    description: ''
    displayName: 'Timeline'
    pluralName: 'timelines'
    singularName: 'timeline'
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::timeline.timeline',
      'oneToMany',
      'api::timeline.timeline'
    >
    tweets: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    userData: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    username: Attribute.UID &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
  }
}

export interface ApiTopicTopic extends Schema.SingleType {
  collectionName: 'topics'
  info: {
    description: ''
    displayName: 'Topic'
    pluralName: 'topics'
    singularName: 'topic'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    data: Attribute.JSON
    isSyncing: Attribute.Boolean & Attribute.DefaultTo<false>
    updatedAt: Attribute.DateTime
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
    displayName: 'Translate'
    pluralName: 'translates'
    singularName: 'translate'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::translate.translate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    mock: Attribute.Boolean
    updatedAt: Attribute.DateTime
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
    displayName: 'Trend'
    pluralName: 'trends'
    singularName: 'trend'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::trend.trend',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    en: Attribute.JSON
    nl: Attribute.JSON
    tr: Attribute.JSON
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'UserFeedback'
    pluralName: 'user-feedbacks'
    singularName: 'user-feedback'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    comment: Attribute.Text
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::user-feedback.user-feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    issueLink: Attribute.String
    point: Attribute.Integer
    processed: Attribute.Boolean
    site: Attribute.String
    updatedAt: Attribute.DateTime
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
    displayName: 'User Notification'
    pluralName: 'user-notifications'
    singularName: 'user-notification'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::user-notification.user-notification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
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
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Victim'
    pluralName: 'victims'
    singularName: 'victim'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    baby: Attribute.Boolean
    birthDate: Attribute.Date
    categories: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::category.category'
    >
    contents: Attribute.Relation<
      'api::victim.victim',
      'manyToMany',
      'api::archive-content.archive-content'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    deceased: Attribute.Boolean
    description_en: Attribute.Text
    elderly: Attribute.Boolean
    images: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::archive-image.archive-image'
    >
    incidentDate: Attribute.Date
    name: Attribute.String
    noshare: Attribute.Boolean
    posts: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::post.post'
    >
    pregnant: Attribute.Boolean
    prisons: Attribute.Relation<
      'api::victim.victim',
      'oneToMany',
      'api::prison.prison'
    >
    publishedAt: Attribute.DateTime
    resolved: Attribute.Boolean
    resolvedDate: Attribute.Date
    sick: Attribute.Boolean
    slug: Attribute.UID<'api::victim.victim', 'name'>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::victim.victim',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases'
  info: {
    displayName: 'Release'
    pluralName: 'releases'
    singularName: 'release'
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
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    name: Attribute.String & Attribute.Required
    releasedAt: Attribute.DateTime
    scheduledAt: Attribute.DateTime
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required
    timezone: Attribute.String
    updatedAt: Attribute.DateTime
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
    displayName: 'Release Action'
    pluralName: 'release-actions'
    singularName: 'release-action'
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
    contentType: Attribute.String & Attribute.Required
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >
    isEntryValid: Attribute.Boolean
    locale: Attribute.String
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
    updatedAt: Attribute.DateTime
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
    collectionName: 'locales'
    description: ''
    displayName: 'Locale'
    pluralName: 'locales'
    singularName: 'locale'
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
    code: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50
          min: 1
        },
        number
      >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files'
  info: {
    description: ''
    displayName: 'File'
    pluralName: 'files'
    singularName: 'file'
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
    alternativeText: Attribute.String
    caption: Attribute.String
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    ext: Attribute.String
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
    formats: Attribute.JSON
    hash: Attribute.String & Attribute.Required
    height: Attribute.Integer
    mime: Attribute.String & Attribute.Required
    name: Attribute.String & Attribute.Required
    previewUrl: Attribute.String
    provider: Attribute.String & Attribute.Required
    provider_metadata: Attribute.JSON
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
    size: Attribute.Decimal & Attribute.Required
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    url: Attribute.String & Attribute.Required
    width: Attribute.Integer
  }
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders'
  info: {
    displayName: 'Folder'
    pluralName: 'folders'
    singularName: 'folder'
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
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
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
    description: ''
    displayName: 'Permission'
    name: 'permission'
    pluralName: 'permissions'
    singularName: 'permission'
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    updatedAt: Attribute.DateTime
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
    description: ''
    displayName: 'Role'
    name: 'role'
    pluralName: 'roles'
    singularName: 'role'
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
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    description: Attribute.String
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    type: Attribute.String & Attribute.Unique
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
  }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users'
  info: {
    description: ''
    displayName: 'User'
    name: 'user'
    pluralName: 'users'
    singularName: 'user'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    confirmationToken: Attribute.String & Attribute.Private
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    provider: Attribute.String
    resetPasswordToken: Attribute.String & Attribute.Private
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::permission': AdminPermission
      'admin::role': AdminRole
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'admin::user': AdminUser
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
      'api::course-application.course-application': ApiCourseApplicationCourseApplication
      'api::course.course': ApiCourseCourse
      'api::dev-mail.dev-mail': ApiDevMailDevMail
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
      'api::term.term': ApiTermTerm
      'api::timeline.timeline': ApiTimelineTimeline
      'api::topic.topic': ApiTopicTopic
      'api::translate.translate': ApiTranslateTranslate
      'api::trend.trend': ApiTrendTrend
      'api::user-feedback.user-feedback': ApiUserFeedbackUserFeedback
      'api::user-notification.user-notification': ApiUserNotificationUserNotification
      'api::victim.victim': ApiVictimVictim
      'plugin::content-releases.release': PluginContentReleasesRelease
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
    }
  }
}
