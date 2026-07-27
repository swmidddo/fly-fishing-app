// sw.js - Service Worker for Offline fly fishing app companion caching

const CACHE_NAME = 'fly-fishing-v2100';
const STATIC_ASSETS = [
    './',
    'index.html',
    'styles.css',
    'db.js',
    'regulations.js',
    'weather.js',
    'exif.js',
    'map.js',
    'tackle_db.js',
    'fish_db.js',
    'fly_box.js',
    'knots.js',
    'auth.js',
    'app.js',
    'images/knot_uni.jpg',
    'images/knot_clinch.jpg',
    'images/knot_loop.jpg',
    'images/knot_davy.jpg',
    'images/knot_palomar.jpg',
    'images/knot_turle.jpg',
    'images/knot_surgeons.jpg',
    'images/knot_blood.jpg',
    'images/knot_nail.jpg',
    'images/knot_albright.jpg',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching static app assets');
            return cache.addAll(STATIC_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Service Worker] Removing old cache', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Network First with Cache Fallback for offline use
self.addEventListener('fetch', (event) => {
    // Ignore non-GET requests and APIs
    if (event.request.method !== 'GET' || 
        event.request.url.includes('open-meteo.com/') || 
        event.request.url.includes('maps.googleapis.com') ||
        event.request.url.includes('generativelanguage.googleapis.com') ||
        event.request.url.includes('/api/save-backup') ||
        event.request.url.includes('session_backup.json')) {
        return;
    }

    event.respondWith(
        fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                const responseClone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseClone);
                });
            }
            return networkResponse;
        }).catch(() => {
            // Network failed or offline - Fall back to cache
            return caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                if (event.request.mode === 'navigate') {
                    return caches.match('index.html');
                }
            });
        })
    );
});

// Listen for skip waiting message from client to instantly activate new version
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
