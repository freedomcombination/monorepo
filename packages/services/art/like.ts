import { useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@fc/config/constants'
import { useAuthContext } from '@fc/context/auth'
import type { Art, LikeMutationArgs } from '@fc/types'

const useLikeArtMutation = (recaptchaToken?: string) => {
  const { token } = useAuthContext()

  return useMutation({
    mutationKey: ['like-art'],
    mutationFn: ({ id, type }: LikeMutationArgs) =>
      axios.put(
        `${API_URL}/api/${type}-art/${id}`,
        { data: { recaptchaToken } },
        { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
      ),
  })
}

type UseLikeArtArgs = {
  art: Art
  recaptchaToken?: string
  onSuccess?: () => void
}

export const useLikeArt = ({
  art,
  recaptchaToken,
  onSuccess,
}: UseLikeArtArgs) => {
  const { profile } = useAuthContext()

  const likeArtMutation = useLikeArtMutation(recaptchaToken)
  const [disabled, setDisabled] = useState(false)
  const [likersStorage, setLikersStorage] = useLocalStorage<number[]>(
    'like-art',
    [],
  )

  if (!art) return { toggleLike: () => null, isLiked: false, loading: false }

  const isLikedByUser = profile && (art.isLiked ?? false)

  const isLikedStorage = likersStorage?.some(id => id === art.id)

  const onError = (error: any) => {
    console.error('ART_BLOG_ERROR', error)
    if (error.response.status === 403) {
      setDisabled(true)
    }
  }

  const toggleLike = async () => {
    if (profile) {
      return likeArtMutation.mutateAsync(
        { id: art.id, type: isLikedByUser ? 'unlike' : 'like' },
        { onSuccess, onError },
      )
    }

    const onSuccessLocal = async () => {
      const updatedStorage = isLikedStorage
        ? likersStorage?.filter(id => id !== art.id)
        : [...(likersStorage || []), art.id]
      setLikersStorage(updatedStorage as number[])

      onSuccess?.()
    }

    return likeArtMutation.mutateAsync(
      { id: art.id, type: isLikedStorage ? 'unlike' : 'like' },
      {
        onSuccess: onSuccessLocal,
        onError,
      },
    )
  }

  return {
    toggleLike,
    isLiked: profile ? isLikedByUser : isLikedStorage,
    loading: likeArtMutation.isPending,
    disabled,
  }
}
