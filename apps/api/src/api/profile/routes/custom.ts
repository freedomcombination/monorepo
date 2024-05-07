export default {
  routes: [
    {
      method: 'GET',
      path: '/profiles/me',
      handler: 'custom.getProfile',
    },
  ],
}
