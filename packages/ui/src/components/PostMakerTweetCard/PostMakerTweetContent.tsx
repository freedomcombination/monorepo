import { ContentEditable } from '../../components'
import { usePostContext } from '../PostProvider'

export const PostMakerTweetContent = () => {
  const { sentence, setSentence, threshold } = usePostContext()

  const handleChange = (value: string) => {
    if (!sentence) return

    setSentence({ ...sentence, value })
  }

  return (
    <ContentEditable
      value={sentence?.value ?? ''}
      onUpdate={handleChange}
      threshold={threshold}
      contentEditable={false}
    />
  )
}
