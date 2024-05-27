import isEmpty from 'lodash/isEmpty'
import { addHours } from 'date-fns'

import {
  getAktifHaber,
  getAmnesty,
  getAmnestyEnNews,
  getBoldMedyaNews,
  getKanttekeningNews,
  getNordicMonitorNews,
  getNosNews,
  // getNuNews,
  getRtlNews,
  getSamanyoluNews,
  getSolidaritywithothersNews,
  getTr724News,
  getTrouwNews,
} from './sources'
import { sentry } from '../../utils/sentry'

// import getTurkishMinuteNews from './sources/turkishminute'

export const syncNews = async () => {
  try {
    const sources = [
      getAktifHaber,
      getAmnesty,
      getBoldMedyaNews,
      getKanttekeningNews,
      getNordicMonitorNews,
      getNosNews,
      // getNuNews,
      getRtlNews,
      getSamanyoluNews,
      getTr724News,
      getTrouwNews,
      getSolidaritywithothersNews,
      getAmnestyEnNews,
      // getTurkishMinuteNews,
    ]

    strapi.log.info('-----------------------------------')
    strapi.log.info('All news fetching... ' + new Date())

    const topicsResponse = await Promise.all(sources.map(source => source()))
    const topics = topicsResponse
      .flat()
      .filter(topic => !isEmpty(topic))
      .sort((a, b) => {
        const aTime = a.time
          ? new Date(a.time).getTime()
          : addHours(new Date(), -5).getTime()
        const bTime = b.time
          ? new Date(b.time).getTime()
          : addHours(new Date(), -5).getTime()

        return bTime - aTime
      })

    strapi.log.info('All news fetched. ' + new Date())

    const targetTopic = await strapi.entityService.findMany('api::topic.topic')

    let updatedTopics = targetTopic

    if (targetTopic) {
      updatedTopics = await strapi.query('api::topic.topic').update({
        where: { id: targetTopic.id },
        data: {
          data: topics,
          isSyncing: false,
        },
      })
    } else {
      updatedTopics = await strapi.query('api::topic.topic').create({
        data: {
          data: topics,
          isSyncing: false,
        },
      })
    }

    return { data: updatedTopics, meta: {} }
  } catch (error) {
    console.error('Sync news', error)
    sentry(error)
    return error
  }
}

/* 
+ 1- Bold Medya
+ https://boldmedya.com/
+ 2- Samanyoluhaber
+ http://www.samanyoluhaber.com/
+ 3- Aktifhaber
+ http://aktifhaber.com/
+ 4- tr724
+ https://www.tr724.com/
+ 1-NOS
+ https://nl.m.wikipedia.org/wiki/Lijst_van_kranten_in_Nederland
+ 2- De Kanttekening
+ https://dekanttekening.nl/
+ 3- Nu
+ https://www.nu.nl/
+ 4- Amnesty.nl
+ https://www.amnesty.nl/
? 5- De Telegraaf
? https://www.telegraaf.nl/
? 6- Ad
? https://www.ad.nl/
+ 7- De Volkskrant
+ https://www.volkskrant.nl/
+ 8- NRC
+ https://www.nrc.nl/
+ 9- Trouw
+ https://www.trouw.nl/
+ 10- Fd
+ https://fd.nl/ 

*/
