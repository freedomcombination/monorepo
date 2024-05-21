export default {
  routes: [
    {
      method: 'GET',
      path: '/hashtags/search',
      handler: 'custom.search',
    },
    {
      method: 'PUT',
      path: '/hashtags/relation/:id',
      handler: 'custom.relation',
    },
    {
      method: 'POST',
      path: '/hashtags/events',
      handler: 'custom.hashtagEventStats',
    },
    {
      method: 'GET',
      path: '/hashtags/stats',
      handler: 'custom.getHashtagStats',
    },
  ],
}
