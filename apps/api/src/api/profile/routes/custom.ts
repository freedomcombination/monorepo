export default {
  routes: [
    {
      method: 'GET',
      path: '/profiles/me/:platform',
      handler: 'custom.getProfile',
    },
  ],
}
