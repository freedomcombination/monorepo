import { sentry } from '../../../utils/sentry'
import { scrapLinks } from './scrapLinks'
import { scrapPage } from './scrapPage'
import { ScrapTopics, Topic } from './types'

/** 
   The scraping topic can compose of one or two stages, some sites provide all the 
  required information for our topic object (url, title, description, categories, 
  image, time) on the front page. For those sites, scraping consists of a single 
  stage, in this case you can use `scrapFrontPage`.

  However some other sites don't provide every detail on the front page, so to get 
  the topic object we make an extra request to the detail page and 
  scrap the details from meta tags. So you must provide @selectors.link. Other selectors are 
  optional if you need to find an element with another selector other than meta tags.

  @publisher, @locale, and @url are the mandatory parameters for both single-stage 
  and two-stage scraping. you can use @proxy and @headers if you need.

  @formatTopic is a mandatory callback function that lets you format the topic scraped 
  from the site
*/
export const scrapTopics: ScrapTopics = async ({
  selectors,
  headers,
  locale,
  proxy = '',
  publisher,
  url,
  formatTopic,
}) => {
  let links = []

  try {
    links = await scrapLinks({
      headers,
      proxy,
      selector: selectors.link,
      url,
    })
  } catch (error) {
    console.error('Scrap links error', url.href, error.message)
    sentry(error)
  }

  const topics: Topic[] = []

  const promises = links.map(async link => {
    try {
      const topic = await scrapPage({
        publisher,
        locale,
        url: link,
        selectors,
        proxy,
        headers,
      })

      return typeof formatTopic === 'function' ? formatTopic(topic) : topic
    } catch (error) {
      console.error(
        'Error while scrapping the page.',
        url.href,
        error.message,
        link?.href,
      )
      sentry(error)
      return null
    }
  })

  const results = await Promise.all(promises)

  for (const topic of results) {
    if (topic) {
      topics.push(topic)
    }
  }

  strapi.log.info(` ${topics.length} ${publisher} news fetched.`)

  return topics
}
