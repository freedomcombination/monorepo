import { addDays, formatISO } from 'date-fns'

import { kebabCase } from 'lodash'
import { KebabCase } from 'type-fest'

type ModelKey =
  | 'activity'
  | 'application'
  | 'blog'
  | 'collection'
  | 'competition'
  | 'hashtag'
  | 'post'
  | 'recommendedTopic'
  | 'recommendedTweet'
type ModelApiKey<T extends ModelKey> = `api::${KebabCase<T>}.${KebabCase<T>}`
type StatsType = 'creator' | 'approver'

// Some models might not have approvers
const models: Record<ModelKey, StatsType[]> = {
  activity: ['creator', 'approver'],
  application: ['creator', 'approver'],
  blog: ['creator', 'approver'],
  collection: ['creator', 'approver'],
  competition: ['creator', 'approver'],
  hashtag: ['creator', 'approver'],
  post: ['creator', 'approver'],
  recommendedTopic: ['creator'],
  recommendedTweet: ['creator'],
}

const getModelStats = async <T extends ModelKey>(
  type: 'creator' | 'approver',
  modelKey: ModelApiKey<T>,
  profileId: number,
  start: string,
  end: string,
) => {
  return await strapi.db.query(modelKey).count({
    where: {
      [type]: profileId,
      createdAt: {
        $between: [start, end],
      },
    },
  })
}

export async function getStats(
  profileId: number,
  date = new Date(),
  totalDays = 7,
) {
  const start = formatISO(addDays(date, -totalDays))
  const end = formatISO(date)

  const statsTypes = ['creator', 'approver'] as StatsType[]
  const modelKeys = Object.keys(models) as ModelKey[]
  const stats = {} as Record<StatsType, Record<ModelKey | 'total', number>>

  for (const type of statsTypes) {
    for (const modelKey of modelKeys) {
      if (!models[modelKey].includes(type)) continue

      const apiPath = kebabCase(modelKey) as KebabCase<ModelKey>

      const count = await getModelStats(
        type,
        `api::${apiPath}.${apiPath}`,
        profileId,
        start,
        end,
      )

      stats[type] = {
        ...stats[type],
        [modelKey]: count,
        total: (stats[type]?.total ?? 0) + count,
      }
    }
  }

  return {
    approves: stats.approver,
    creates: stats.creator,
  }
}
