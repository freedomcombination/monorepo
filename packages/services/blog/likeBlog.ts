import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL, RecaptchaKeys } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import type { LikeMutationArgs } from '@fc/types'

import { useGetBlogBySlug } from './getBlogBySlug'
import { useRecaptchaToken } from '../common/useRecaptchaToken'

const likeBlog = async ({
  id,
  type,
  token,
  recaptchaToken,
}: LikeMutationArgs) =>
  axios.put(
    `${API_URL}/api/${type}-blog/${id}`,
    { data: { recaptchaToken } },
    { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
  )

const useLikeBlogMutation = () => {
  const { token } = useAuthContext()
  const recaptchaToken = useRecaptchaToken(RecaptchaKeys.LIKE_BLOG)

  return useMutation({
    mutationKey: ['like-blog'],
    mutationFn: ({ id, type }: LikeMutationArgs) =>
      likeBlog({ id, type, token, recaptchaToken }),
  })
}

export const useLikeBlog = () => {
  const [isDisabled, setIsDisabled] = useState(false)
  const { data, refetch } = useGetBlogBySlug()

  const blog = data?.data

  const { profile } = useAuthContext()

  const likeBlogMutation = useLikeBlogMutation()

  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-blog',
    [],
  )

  if (!blog) return { toggleLike: () => null, isLiked: false, isLoading: false }

  const isLikedByUser = profile && blog?.isLiked

  const isLikedStorage = likersStorage?.some(id => id === blog.id)

  const handleError = (error: any) => {
    console.error('LIKE_BLOG_ERROR', error)
    if (error.response.status === 403) {
      setIsDisabled(true)
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
    isLoading: likeBlogMutation.isPending,
    isDisabled,
  }
}
