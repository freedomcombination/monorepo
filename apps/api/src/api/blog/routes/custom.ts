export default {
  routes: [
    {
      method: 'PUT',
      path: '/blogs/relation/:id',
      handler: 'custom.relation',
    },
    {
      method: 'GET',
      path: '/authors',
      handler: 'custom.getAuthors',
    },
    {
      method: 'PUT',
      path: '/like-blog/:id',
      handler: 'custom.like',
    },
    {
      method: 'PUT',
      path: '/unlike-blog/:id',
      handler: 'custom.unlike',
    },
    {
      method: 'PUT',
      path: '/view-blog/:id',
      handler: 'custom.view',
    },
    {
      method: 'GET',
      path: '/blogs/:slug',
      handler: 'blog.findOne',
    },
  ],
}
