declare const self: ServiceWorkerGlobalScope

self.addEventListener('push', event => {
  const data = JSON.parse(event.data?.text() ?? '{ title: "" }')
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: '/icons/android-chrome-192x192.png',
    }),
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        if (clientList.length > 0) {
          let client = clientList[0]
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i]
            }
          }

          return client.focus()
        }

        return self.clients.openWindow('/')
      }),
  )
})

export type {}
