export default {
  routes: [
    {
      method: 'PUT',
      path: '/posts/relation/:id',
      handler: 'custom.relation',
    },
    {
      method: 'POST',
      path: '/posts/createPosts',
      handler: 'custom.createPosts',
    },
  ],
}
