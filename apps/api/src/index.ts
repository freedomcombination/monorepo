import { subscribeDb } from './libs/subscribeDb'
import { syncAdmin } from './libs/syncAdmin'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  register(/* { strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async bootstrap() {
    try {
      // subscribeDb()
      syncAdmin()
    } catch (error) {
      console.error('Bootstrap error', JSON.stringify(error, null, 2))
    }
  },
}
