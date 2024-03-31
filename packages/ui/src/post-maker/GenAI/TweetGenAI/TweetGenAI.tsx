import { createHashtagSentence, useGetHashtagSentences } from '@fc/services'
import { RedisPost } from '@fc/types'

import { PostGenAI, PostGenAIProps } from '../GenAI'
import { useGenPostContext, ArchivePost } from '../GenPostProvider'

type TweetGenAIProps = {
  postId: number
} & Pick<PostGenAIProps, 'archiveContentId' | 'content' | 'colorScheme'>

export const TweetGenAI: React.FC<TweetGenAIProps> = ({
  postId,
  archiveContentId,
  content,
}: TweetGenAIProps) => {
  const { hashtagId } = useGenPostContext()
  const { refetch } = useGetHashtagSentences(hashtagId)

  const handleSave = async (posts: ArchivePost[]) => {
    if (posts.length === 0) return
    const post = posts[0]
    await createHashtagSentence({
      hashtagId,
      value: post.sentences.map(
        sentence => `${sentence}::${postId}::${0}::${0}` as RedisPost,
      ),
    })
    refetch()
  }

  const incompletePost: ArchivePost = {
    sentences: [] as string[],
  } as ArchivePost

  const parseIncomplete = (incompleteText: string) => {
    if (incompleteText.length < 5) return []
    if (incompleteText.length < 60) {
      incompletePost.sentences = []
    }
    try {
      const src = incompleteText.substring(2, incompleteText.length - 2)
      const parts = src.split('","')
      incompletePost.sentences = parts
    } catch (e) {}

    return [incompletePost]
  }

  const parseCompleted = (completedText: string) => {
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
