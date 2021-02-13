

// self.addEventListener("message", (e)=>{
//   if (e.data.action=='skipWaiting') {
//     console.log('skip waiting')
//     self.skipWaiting()
//   }
// })

self.addEventListener('install', async event => {
  await self.skipWaiting()
  console.log('skip waiting')
})

self.addEventListener('active', async event => {
  console.log('active', event)
  await workbox.core.clientsClaim()
})

if (workbox) {

  console.log(`Workbox is loaded`);

  self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  workbox.routing.registerRoute(
    /^https:\/\/www\.fduhole\.tk\/api\/.*/, // 匹配的路由
    workbox.strategies.networkFirst({cacheName: 'api'})
  )

  workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net\/gh\/fduhole\/web@img\/.*/, // 匹配的路由
    // workbox.strategies.staleWhileRevalidate({cacheName: 'img'}),
    workbox.strategies.cachedFirst({
      plugins: [
        new workbox.CacheableResponse.Plugin({
          statuses: [0, 200]
        })
      ]
    }),
  )
} 
else {
  console.log(`Workbox didn't load`);
}
