// sw.js - Service Worker auto-clearing and unregister script
const CACHE_NAME = 'fly-fishing-v100530';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map(k => caches.delete(k)));
        }).then(() => self.registration.unregister()).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    // Direct network bypass
    return;
});
