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

        if (isEmpty(param)) {
          delete draft[key]
        }
      }

      return draft
    })
  }

  const changeParams = useCallback(
    (args: ChangeParamArgs) => {
      const sanitizedQuery = sanitizeQuery(query, args)
      const sanitizedArgs = sanitizeArgs(args)

      const newArgs = { ...sanitizedArgs }

      // sanitizedQuery is immutable so, make acopy of it for delete page property.
      const updatedQuery = { ...sanitizedQuery }

      // if there is any new parameters delete page parameter
      const shouldRemovePage =
        Object.keys(newArgs).some(key => key !== 'page') &&
        'page' in updatedQuery &&
        !('page' in newArgs)

      if (shouldRemovePage) {
        delete updatedQuery.page
      }

      const newQuery = { ...updatedQuery, ...newArgs }

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
