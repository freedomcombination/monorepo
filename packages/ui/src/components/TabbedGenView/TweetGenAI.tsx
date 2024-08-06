import { createHashtagSentence, useGetHashtagSentences } from '@fc/services'
import { RedisPost } from '@fc/types'

import { ArchivePostType, useGenPostContext } from '../GenPostProvider'
import { PostGenAI, PostGenAIProps } from '../PostGenAI'

type TweetGenAIProps = {
  postId: number
} & Pick<PostGenAIProps, 'archiveContentId' | 'content' | 'colorPalette'>

export const TweetGenAI: React.FC<TweetGenAIProps> = ({
  postId,
  archiveContentId,
  content,
}: TweetGenAIProps) => {
  const { hashtag } = useGenPostContext()
  const { refetch } = useGetHashtagSentences(hashtag.id)

  const handleSave = async (posts: ArchivePostType[]) => {
    if (posts.length === 0) return
    const post = posts[0]
    await createHashtagSentence({
      hashtagId: hashtag.id,
      value: post.sentences.map(
        sentence =>
          `${sentence}::${postId}::${0}::${0}:::${archiveContentId}` as RedisPost,
      ),
    })
    refetch()
  }

  const incompletePost: ArchivePostType = {
    sentences: [] as string[],
  } as ArchivePostType

  const parseIncomplete = (incompleteText: string) => {
    if (incompleteText.length < 5) return []
    if (incompleteText.length < 60) {
      incompletePost.sentences = []
    }
    try {
      const src = incompleteText.substring(2, incompleteText.length - 2)
      const parts = src.split('","')
      incompletePost.sentences = parts
    } catch (e) {
      console.error(e)
    }

    return [incompletePost]
  }

  const parseCompleted = (completedText: string): ArchivePostType[] => {
    incompletePost.sentences = JSON.parse(completedText)

    return [incompletePost]
  }

  return (
    <PostGenAI
      content={content}
      archiveContentId={archiveContentId}
      onlySentences={true}
      apiUrl="/api/route-tweet-gen"
      parseIncomplete={parseIncomplete}
      parseCompleted={parseCompleted}
      onSave={handleSave}
      noBorder
    />
  )
}
