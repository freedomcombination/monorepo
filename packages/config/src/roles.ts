import { PartialStrapiEndpointMap, RoleType } from '@fc/types'

export type RoleActionType =
  | 'create'
  | 'approve'
  | 'update'
  | 'delete'
  | 'publish'

export const actionRolesEndpoints: PartialStrapiEndpointMap<
  Record<RoleActionType, RoleType[]>
> = {
  activities: {
    create: ['contentmanager', 'platformcoordinator', 'kunsthaltecoordinator'],
    approve: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    update: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    delete: [],
    publish: ['contentmanager', 'platformcoordinator'],
  },
  'archive-contents': {
    create: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    approve: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    update: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    delete: [],
    publish: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
  },
  arts: {
    create: ['all'],
    approve: ['arteditor', 'kunsthaltecoordinator'],
    update: ['arteditor', 'kunsthaltecoordinator'],
    delete: ['arteditor', 'kunsthaltecoordinator'],
    publish: ['arteditor', 'kunsthaltecoordinator'],
  },
  blogs: {
    create: ['author', 'contentmanager'],
    approve: ['contentmanager', 'translator'],
    update: ['author', 'contentmanager', 'translator'],
    delete: ['author'],
    publish: [],
  },
  categories: {
    create: ['contentmanager', 'platformcoordinator', 'kunsthaltecoordinator'],
    approve: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    update: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    delete: [],
    publish: ['contentmanager', 'platformcoordinator', 'kunsthaltecoordinator'],
  },
  collections: {
    create: ['arteditor', 'kunsthaltecoordinator'],
    approve: ['arteditor', 'kunsthaltecoordinator'],
    update: ['arteditor', 'kunsthaltecoordinator'],
    delete: [],
    publish: ['arteditor', 'kunsthaltecoordinator'],
  },
  courses: {
    create: ['academyeditor', 'platformcoordinator', 'kunsthaltecoordinator'],
    approve: [
      'academyeditor',
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    update: ['academyeditor', 'platformcoordinator', 'kunsthaltecoordinator'],
    delete: [],
    publish: ['academyeditor', 'platformcoordinator', 'kunsthaltecoordinator'],
  },
  hashtags: {
    create: ['contentmanager'],
    approve: ['contentmanager'],
    update: ['contentmanager'],
    delete: [],
    publish: ['contentmanager'],
  },
  posts: {
    create: ['all'],
    approve: ['contentmanager'],
    update: ['contentmanager'],
    delete: [],
    publish: ['contentmanager'],
  },
  profiles: {
    create: ['platformcoordinator', 'kunsthaltecoordinator'],
    approve: ['platformcoordinator', 'kunsthaltecoordinator'],
    update: ['platformcoordinator', 'kunsthaltecoordinator'],
    delete: [],
    publish: ['platformcoordinator', 'kunsthaltecoordinator'],
  },
  tags: {
    create: ['contentmanager', 'platformcoordinator', 'kunsthaltecoordinator'],
    approve: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    update: [
      'contentmanager',
      'translator',
      'platformcoordinator',
      'kunsthaltecoordinator',
    ],
    delete: [],
    publish: ['contentmanager', 'platformcoordinator', 'kunsthaltecoordinator'],
  },
}
