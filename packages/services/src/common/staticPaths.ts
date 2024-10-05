import { strapiRequest } from '@fc/lib'
import { StrapiCollectionEndpoint, StrapiLocale, StrapiModel } from '@fc/types'

const getModelPaths = async <T extends StrapiModel>(
  endpoint: StrapiCollectionEndpoint,
) => {
  const locales = ['tr', 'en', 'nl'] as StrapiLocale[]

  return (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await strapiRequest<T>({ endpoint })

        const models = responses?.data

        return models?.map(model => ({
          params: { slug: (model as { slug: string }).slug },
          locale,
        }))
      }),
    )
  ).flat()
}

export const getModelStaticPaths = async <T extends StrapiModel>(
  endpoint: StrapiCollectionEndpoint,
) => {
  const paths = await getModelPaths<T>(endpoint)

  return { paths, fallback: true }
}
