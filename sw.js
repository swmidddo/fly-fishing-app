// sw.js - Service Worker for Offline fly fishing app companion caching

const CACHE_NAME = 'fly-fishing-v86';
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
    'auth.js',
    'app.js',
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

// Fetch Event - Cache First, fallback to Network
self.addEventListener('fetch', (event) => {
    // Ignore non-GET requests, weather API, Google Maps, Gemini AI, and our backup API/file from caching
    if (event.request.method !== 'GET' || 
        event.request.url.includes('open-meteo.com/') || 
        event.request.url.includes('maps.googleapis.com') ||
        event.request.url.includes('generativelanguage.googleapis.com') ||
        event.request.url.includes('/api/save-backup') ||
        event.request.url.includes('session_backup.json')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            
            // Try to fetch over network
            return fetch(event.request).then((networkResponse) => {
                // Cache valid responses dynamically
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch((err) => {
                console.log("[Service Worker] Fetch failed, resource offline:", event.request.url);
                // Return fallback if needed (e.g. index.html)
                if (event.request.mode === 'navigate') {
                    return caches.match('index.html');
                }
            });
        })
    );
});
