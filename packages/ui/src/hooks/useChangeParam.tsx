import { produce } from 'immer'
import { isEmpty, isEqual } from 'lodash'
import { useRouter } from 'next/router'
import qs from 'qs'
import { ParsedUrlQuery } from 'querystring'

export type ChangeParamArgs = Record<
  string,
  string | string[] | number | undefined
>

export const useChangeParams = () => {
  const { query, push } = useRouter()

  const changeParams = (args: ChangeParamArgs) => {
    // In the case of query has empty string param which we want to remove,
    // it should be removed from both the query and args
    const cleanedQuery = cleanQuery(query, args)
    const cleanedArgs = cleanArgs(args)

    // TODO: Remove existing page query if other params are changed

    const newQuery = { ...cleanedQuery, ...cleanedArgs }

    if (isEqual(query, newQuery)) {
      return
    }

    push({ query: newQuery })
  }

  const changePage = (page: number) => {
    changeParams({ page })
  }

  const changeCategories = (categories: string) => {
    changeParams({ categories })
  }

  const changeSearch = (search: string) => {
    changeParams({ q: search })
  }

  return { changeParams, changePage, changeCategories, changeSearch }
}

const cleanQuery = (query: ParsedUrlQuery, args: ChangeParamArgs) => {
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

// When we provide null value for a param, remove it from the query
const cleanArgs = (args: ChangeParamArgs) => {
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
