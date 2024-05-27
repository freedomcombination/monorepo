export const sentry = error => {
  strapi.plugin('sentry').service('sentry').sendError(error)
}
