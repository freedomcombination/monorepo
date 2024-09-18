import { useCallback } from 'react'

import { produce } from 'immer'
import { isEmpty, isEqual } from 'lodash'
import { useRouter } from 'next/router'
import qs from 'qs'
import { ParsedUrlQuery } from 'querystring'

type ChangeParamArgs = Record<string, string | string[] | number | undefined>

export const useChangeParams = () => {
  const { query, push } = useRouter()

  // When we provide null value for a param, remove it from the query
  const sanitizeArgs = (args: ChangeParamArgs) => {
    return produce(args, draft => {
      for (const key in draft) {
        const param = draft[key]

        if (isEmpty(param)) {
          delete draft[key]
        }

        if (Array.isArray(param)) {
          const filtered = param.filter(Boolean)

          if (filtered.length) {
            draft[key] = qs.stringify(filtered, {
              encodeValuesOnly: true,
            })
          } else {
            delete draft[key]
          }
        }
      }

      return draft
    })
  }

  const sanitizeQuery = (query: ParsedUrlQuery, args: ChangeParamArgs) => {
    return produce(query, draft => {
      for (const key in args) {
        const param = args[key]
        
        if (args['categories']) {
          args['page'] = 1
        }
        if (isEmpty(param)) {
          delete draft[key]
        }
      }

      return draft
    })
  }

  const changeParams = useCallback(
    (args: ChangeParamArgs) => {
      // In the case of query has empty string param which we want to remove,
      // it should be removed from both the query and args
      const sanitizedQuery = sanitizeQuery(query, args)
      const sanitizedArgs = sanitizeArgs(args)

      // TODO: Remove existing page query if other params are changed
      // if (args['categories']) {
      //   args['page'] = 1
      // }
      const newQuery = { ...sanitizedQuery, ...sanitizedArgs }

      if (isEqual(query, newQuery)) {
        return
      }
      
      push({ query: newQuery })
    },
    [query, push],
  )

  const changePage = useCallback(
    (page: number) => {
      changeParams({ page: page === 1 ? undefined : `${page}` })
    },
    [changeParams],
  )

  const changeCategories = useCallback(
    (categories: string[]) => {
      changeParams({ categories })
    },
    [changeParams],
  )

  const changeSearch = useCallback(
    (search?: string) => {
      changeParams({ q: search })
    },
    [changeParams],
  )

  return { changeParams, changePage, changeCategories, changeSearch }
}
