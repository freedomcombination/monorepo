export default {
  routes: [
    {
      method: 'GET',
      path: '/profiles/me',
      handler: 'custom.getProfile',
    },
    {
      method: 'POST',
      path: '/profiles/user',
      handler: 'custom.updateUser',
    },
  ],
}
