import { RedisPost } from '@fc/types'

export type UpdateArgs = { hashtagId: number; index: number; value: RedisPost }
export type CreateArgs = { hashtagId: number; value: RedisPost[] }
export type DeleteArgs = { hashtagId: number; value: RedisPost }
