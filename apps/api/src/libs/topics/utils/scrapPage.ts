import { load } from 'cheerio'
import axios from 'axios'
import { ScrapPage, Topic } from './types'

export const scrapPage: ScrapPage = async ({
  publisher,
  locale,
  selectors,
  url,
  proxy = '',
  headers,
}) => {
  try {
    const mainUrl = `${proxy}${url}`
    const config = { headers }
    const response = await axios.get(mainUrl, config)

    const $ = load(response.data)

    const titleSelector = selectors.title || 'meta[property="og:title"]'
    const descriptionSelector =
      selectors.description || 'meta[property="og:description"]'
    const imageSelector = selectors.image || 'meta[property="og:image"]'
    const timeSelector =
      selectors.time || 'meta[property="article:published_time"]'
    const articleSectionSelector = 'meta[property="article:section"]'
    const keywordSelectors = 'meta[property="keywords"]'

    const title = $(titleSelector).attr('content')
    const description = $(descriptionSelector).attr('content')
    const image = $(imageSelector).attr('content')
    const time = $(timeSelector).attr('content')
    const category =
      $(selectors.category).text() ||
      $(selectors.category).attr('content') ||
      $(articleSectionSelector).attr('content') ||
      $(keywordSelectors).attr('content')

    if (!title || !description || !image) {
      return
    }

    return {
      description,
      image,
      locale,
      publisher,
      time,
      title,
      url: url.toString(),
      category,
    }
  } catch (error: any) {
    console.error(`Error while scraping ${url}`, error.response || error)

    return <Topic>{
      category: 'SCRAPING ERROR',
      description: 'An error ocurred while scraping topics from : ' + url,
      locale,
      publisher,
      time: new Date().toDateString(),
      title: 'ERROR',
      url: url.toString(),
    }
  }
}
