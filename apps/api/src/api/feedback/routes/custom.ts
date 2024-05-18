export default {
  routes: [
    {
      method: 'POST',
      path: '/contact/email',
      handler: 'custom.sendEmail',
    },
  ],
}
