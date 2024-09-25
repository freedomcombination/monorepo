import { useStrapiRequest } from '@fc/services/common/useStrapiRequest'
import { useHashtagBySlug } from '@fc/services/hashtag/getHashtagBySlug'
import type { Trend, TwitterTrend } from '@fc/types'

export const useFindHashtagInTrends = () => {
  const hashtag = useHashtagBySlug()
  const { data: trendsData } = useStrapiRequest<Trend>({ endpoint: 'trend' })

  const defaultHashtags = [hashtag.hashtagDefault, hashtag.hashtagExtra].filter(
    Boolean,
  )

  return defaultHashtags.map(hashtag => {
    const { nl, tr, en } = trendsData?.data || {}

    if (!hashtag || !nl || !tr || !en) return null

    const indexEn = en?.findIndex(
      (trend: TwitterTrend) => trend.name === hashtag,
    )
    const indexNl = nl?.findIndex(
      (trend: TwitterTrend) => trend.name === hashtag,
    )
    const indexTr = tr?.findIndex(
      (trend: TwitterTrend) => trend.name === hashtag,
    )

    if (!indexEn || !indexNl || !indexTr) return null

    return {
      nl: { ...nl[indexNl], indexNl },
      tr: { ...tr[indexTr], indexTr },
      en: { ...en[indexEn], indexEn },
    }
  })
}
