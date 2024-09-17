import { useContext } from 'react'

import { PostContext } from './PostContext'

export const usePostContext = () => useContext(PostContext)
