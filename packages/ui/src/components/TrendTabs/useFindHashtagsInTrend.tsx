import { useHashtag, useTrends } from '@fc/services'
import { TwitterTrend } from '@fc/types'

export const useFindHashtagInTrends = () => {
  const hashtag = useHashtag()
  const { data: trendsData } = useTrends()

  const defaultHashtags = [hashtag.hashtagDefault, hashtag.hashtagExtra].filter(
    Boolean,
  )

  return defaultHashtags.map(hashtag => {
    const { nl, tr, en } = trendsData ?? {}

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
