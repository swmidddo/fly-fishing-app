// sw.js - Middo's Fly Fishing Backcountry Offline Service Worker
const CACHE_NAME = 'fly-fishing-v101400';

// Core Local Assets to Pre-Cache on Install
const CORE_ASSETS = [
    './',
    'index.html',
    'styles.css',
    'app.js',
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
    'images/logo.jpg',
    'images/app_icon.png',
    // Knot guide images
    'images/knot_albright.jpg',
    'images/knot_blood.jpg',
    'images/knot_clinch.jpg',
    'images/knot_davy.jpg',
    'images/knot_loop.jpg',
    'images/knot_nail.jpg',
    'images/knot_palomar.jpg',
    'images/knot_surgeons.jpg',
    'images/knot_turle.jpg',
    'images/knot_uni.jpg',
    // External CDN Libraries for complete offline fallback
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js',
    'https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install Event: Resilient individual pre-caching of core app shell & offline assets
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('[Backcountry SW] Pre-caching core app shell & offline assets...');
            return Promise.allSettled(
                CORE_ASSETS.map((url) =>
                    fetch(url, { mode: url.startsWith('http') ? 'cors' : 'same-origin' })
                        .then((res) => {
                            if (res && res.ok) return cache.put(url, res);
                        })
                        .catch((err) => {
                            console.warn('[Backcountry SW] Asset skipped during pre-cache:', url);
                        })
                )
            );
        })
    );
});

// Activate Event: Clean up outdated caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[Backcountry SW] Deleting obsolete cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event: Offline-First / Network with Cache Fallback
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Skip non-GET requests and Gemini / weather POST APIs
    if (req.method !== 'GET') return;
    if (url.hostname.includes('googleapis.com') && url.pathname.includes('generateContent')) return;

    // 1. Navigation requests (HTML page loads) - Network-first with instant offline cache fallback
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((networkRes) => {
                    if (networkRes && networkRes.status === 200) {
                        const copy = networkRes.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
                    }
                    return networkRes;
                })
                .catch(() => {
                    console.log('[Backcountry SW] Offline navigation requested - serving cached app shell');
                    return caches.match('./') || caches.match('index.html');
                })
        );
        return;
    }

    // 2. Static Assets (JS, CSS, Images, Fonts, CDNs) - Cache-first with background network refresh
    event.respondWith(
        caches.match(req).then((cachedRes) => {
            if (cachedRes) {
                // Fetch in background to update cache for next time
                fetch(req).then((freshRes) => {
                    if (freshRes && freshRes.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, freshRes));
                    }
                }).catch(() => {});
                return cachedRes;
            }

            // If not in cache, fetch from network and cache dynamically
            return fetch(req).then((networkRes) => {
                if (networkRes && networkRes.status === 200) {
                    const copy = networkRes.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
                }
                return networkRes;
            }).catch((err) => {
                console.warn('[Backcountry SW] Fetch failed offline:', req.url);
            });
        })
    );
});
