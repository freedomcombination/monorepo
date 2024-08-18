import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL, RecaptchaKeys } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { LikeMutationArgs } from '@fc/types'

import { useGetBlogSlug } from './getBlogBySlug'
import { useRecaptchaToken } from '../common'

const useLikeBlogMutation = () => {
  const { token } = useAuthContext()
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_BLOG)

  return useMutation({
    mutationKey: ['like-blog'],
    mutationFn: ({ id, type }: LikeMutationArgs) =>
      axios.put(
        `${API_URL}/api/${type}-blog/${id}`,
        { data: { recaptchaToken } },
        { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
      ),
  })
}

export const useLikeBlog = () => {
  const [disabled, setDisabled] = useState(false)
  const { data, refetch } = useGetBlogSlug()

  const blog = data?.data

  const { profile } = useAuthContext()

  const likeBlogMutation = useLikeBlogMutation()

  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-blog',
    [],
  )

  if (!blog) return { toggleLike: () => null, isLiked: false, loading: false }

  const isLikedByUser = profile && blog?.isLiked

  const isLikedStorage = likersStorage?.some(id => id === blog.id)

  const handleError = (error: any) => {
    console.error('LIKE_BLOG_ERROR', error)
    if (error.response.status === 403) {
      setDisabled(true)
    }
  }

  const toggleLike = async () => {
    if (profile) {
      return likeBlogMutation.mutate(
        { id: blog.id, type: isLikedByUser ? 'unlike' : 'like' },
        {
          onSuccess: async () => {
            refetch()
          },
          onError: handleError,
        },
      )
    }

    return likeBlogMutation.mutate(
      { id: blog.id, type: isLikedStorage ? 'unlike' : 'like' },
      {
        onSuccess: async () => {
          const updatedStorage = isLikedStorage
            ? likersStorage?.filter(id => id !== blog.id)
            : [...(likersStorage || []), blog.id]

          setLikersStorage(updatedStorage as number[])

          await refetch()
        },
        onError: handleError,
      },
    )
  }

  const isLiked = profile ? isLikedByUser : isLikedStorage

  return {
    toggleLike,
    isLiked,
    loading: likeBlogMutation.isPending,
    disabled,
  }
}
