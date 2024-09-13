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
    const newQuery = cleanQuery(query, args)
    cleanArgs(args)
    
    if (args['categories']) {
      args['page'] = 1
    }

    if (JSON.stringify(query) != JSON.stringify({ ...newQuery, ...args })) {
      push({ query: { ...newQuery, ...args } })
    }
  }

  return changeParams
}

const cleanQuery = (query: ParsedUrlQuery, args: ChangeParamArgs) => {
  const newQuery = Object.assign({}, query)
  for (const key in args) {
    const param = args[key]
    if (
      param === '' ||
      param === null ||
      param === undefined ||
      (param as string).length === 0
    ) {
      delete newQuery[key]
    }
  }

  return newQuery
}

// When we provide null value for a param, remove it from the query
const cleanArgs = (args: ChangeParamArgs) => {
  for (const key in args) {
    const param = args[key]
    if (param === null || param === undefined) {
      delete args[key]
    }

    if (Array.isArray(param)) {
      const filtered = param.filter(p => !!p)
      if (filtered.length) {
        args[key] = qs.stringify(filtered, {
          encodeValuesOnly: true,
        })
      } else {
        delete args[key]
      }
    }
  }
}
