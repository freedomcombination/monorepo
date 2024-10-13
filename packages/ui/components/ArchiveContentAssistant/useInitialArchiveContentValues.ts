import { useEffect, useReducer } from 'react'

import type { Message } from 'ai/react'

import { useStrapiRequest } from '@fc/services/common/strapiRequest'
import type { Category, Prison, Victim } from '@fc/types'

type State = {
  usersMessage: Message | null
  assistantsMessage: Message | null
  categories: string[]
  prisons: string[]
  victims: string[]
}

type Action = {
  type: string
  payload: any
}

type Response = {
  categories: Category[]
  prisons: Prison[]
  victims: Victim[]
  usersMessage: Message | null
  assistantsMessage: Message | null
}

const reducer = (state: State, action: Action) => {
  // console.log('state: ', state, '\n\n', 'action: ', action)
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
    case 'SET_PRISONS':
      return {
        ...state,
        prisons: action.payload,
      }
    case 'SET_VICTIMS':
      return {
        ...state,
        victims: action.payload,
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
    prisons: [],
    victims: [],
  })

  const categoriesQuery = useStrapiRequest<Category>({
    endpoint: 'categories',
    filters:
      state.categories.length > 0
        ? {
            $or: [
              { name_en: { $in: state.categories } },
              { name_nl: { $in: state.categories } },
              { name_tr: { $in: state.categories } },
            ],
          }
        : {
            // Return nth when categories array is empty
            name_en: { $eqi: 'non-existing-category' },
          },
  })

  const prisonsQuery = useStrapiRequest<Prison>({
    endpoint: 'prisons',
    filters:
      state.prisons.length > 0
        ? {
            $or: state.prisons.map((prison: string) => ({
              name: { $eqi: prison },
            })),
          }
        : { name: { $eqi: 'non-existing-prison' } },
  })

  const victimsQuery = useStrapiRequest<Victim>({
    endpoint: 'victims',
    filters:
      state.victims.length > 0
        ? {
            $or: state.victims.map((victim: string) => ({
              name: { $eqi: victim },
            })),
          }
        : { name: { $eqi: 'non-existing-victim' } },
  })

  useEffect(() => {
    try {
      const [usersMessage, assistantsMessage] = messages || []

      if (!usersMessage || !assistantsMessage) {
        return
      }

      const rawAssistantsMessage = JSON.parse(
        assistantsMessage?.content || '{}',
      )

      const rawCategories = rawAssistantsMessage?.categories ?? []
      const rawPrisons = rawAssistantsMessage?.prisons ?? []
      const rawVictims = rawAssistantsMessage?.victims ?? []

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
        type: 'SET_PRISONS',
        payload: rawPrisons,
      })

      dispatch({
        type: 'SET_VICTIMS',
        payload: rawVictims,
      })
    } catch (error) {
      console.error('Error parsing assistant message', error)
    }
  }, [messages])

  return {
    ...state,
    categories: categoriesQuery.data?.data || [],
    prisons: prisonsQuery.data?.data || [],
    victims: victimsQuery.data?.data || [],
  }
}
