import { useEffect, useReducer } from 'react'

import type { Message } from 'ai/react'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { Category } from '@fc/types'

type State = {
  usersMessage: Message | null
  assistantsMessage: Message | null
  // TODO: Use prisons and victims from the assistant message
  categories: string[]
}

type Action = {
  type: string
  payload: any
}

type Response = {
  categories: Category[]
  // TODO: Prisons and victims should be fetched
  usersMessage: Message | null
  assistantsMessage: Message | null
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USERS_MESSAGE':
      return {
        ...state,
        usersMessage: action.payload,
      }
    case 'SET_ASSISTANTS_MESSAGE':
      return {
        ...state,
        assistantsMessage: action.payload,
      }
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      }

    default:
      return state
  }
}

export const useInitialArchiveContentValues = (
  messages: Message[],
): Response => {
  const [state, dispatch] = useReducer(reducer, {
    usersMessage: null,
    assistantsMessage: null,
    categories: [],
  })

  console.log('state.categories', state.categories)

  const categoriesQuery = useStrapiRequest<Category>({
    endpoint: 'categories',
    filters: {
      $or: [
        // TODO: Filtering by name is not ideal. Can we get the slug from the assistant?
        // Consider filtering by slug instead or always one language field with $containsi operator.
        // $in operator is very strict and requires exact match. It's case insensitive and will not work extra spaces.
        { name_en: { $in: state.categories } },
        { name_nl: { $in: state.categories } },
        { name_tr: { $in: state.categories } },
      ],
    },
    queryOptions: {
      enabled: state.categories.length > 0,
    },
  })

  useEffect(() => {
    try {
      const [usersMessage, assistantsMessage] = messages || []
      console.log('++++MESSAGES', messages)

      if (!usersMessage || !assistantsMessage) {
        return
      }

      const rawAssistantsMessage = JSON.parse(
        assistantsMessage?.content || '{}',
      )
      const rawCategories = rawAssistantsMessage?.categories ?? []
      const rawTags = rawAssistantsMessage?.tags ?? []

      dispatch({
        type: 'SET_USERS_MESSAGE',
        payload: usersMessage,
      })

      dispatch({
        type: 'SET_ASSISTANTS_MESSAGE',
        payload: assistantsMessage,
      })

      dispatch({
        type: 'SET_CATEGORIES',
        payload: rawCategories,
      })

      dispatch({
        type: 'SET_TAGS',
        payload: rawTags,
      })
    } catch (error) {
      console.error('Error parsing assistant message', error)
    }
  }, [messages])

  return {
    ...state,
    categories: categoriesQuery.data?.data || [],
    // TODO: Prisons and victims
  }
}
