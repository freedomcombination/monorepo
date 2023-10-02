export default {
  routes: [
    {
      method: 'PUT',
      path: '/arts/approve/:id',
      handler: 'custom.approve',
    },
    {
      method: 'PUT',
      path: '/like-art/:id',
      handler: 'custom.like',
    },
    {
      method: 'PUT',
      path: '/unlike-art/:id',
      handler: 'custom.unlike',
    },
    {
      method: 'PUT',
      path: '/view-art/:id',
      handler: 'custom.view',
    },
  ],
}
