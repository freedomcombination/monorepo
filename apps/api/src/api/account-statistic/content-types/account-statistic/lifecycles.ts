import { getAccountStats } from '../../../../libs'

export default {
  async beforeCreate(event) {
    if (process.env.NODE_ENV === 'development') return

    const { username, date } = event.params.data

    const existing = await strapi.db
      .query('api::account-statistic.account-statistic')
      .findOne({ where: { username, date } })

    // It seems throwing an error in beforeCreate lifecycle is not working
    // There will be a duplicate entry with empty stats data
    if (!existing) {
      const data = await getAccountStats(username, new Date(date))
      event.params.data = { username, date, ...data }
    }
  },
}
