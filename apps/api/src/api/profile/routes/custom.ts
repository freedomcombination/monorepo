export default {
  routes: [
    {
      method: 'GET',
      path: '/profiles/me',
      handler: 'custom.getProfile',
    },
    {
      method: 'GET',
      path: '/profiles/roles',
      handler: 'custom.getRoles',
    },
  ],
}
