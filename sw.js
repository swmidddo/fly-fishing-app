// sw.js - Middo's Fly Fishing Backcountry Offline Service Worker
const CACHE_NAME = 'fly-fishing-v101570';

// Message Event: Allow web app clients to force immediate skipWaiting & activation
self.addEventListener('message', (event) => {
    if (event.data && (event.data.type === 'SKIP_WAITING' || event.data === 'skipWaiting')) {
        console.log('[Backcountry SW] Force skipWaiting triggered by client update');
        self.skipWaiting();
    }
});

// Core Local Assets to Pre-Cache on Install
const CORE_ASSETS = [
    './',
    'index.html',
    'manifest.json',
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
    'images/icon-192.png',
    'images/icon-512.png',
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

    // Skip non-GET requests
    if (req.method !== 'GET') return;

    // DIRECT NETWORK ONLY: Never intercept or cache serverless APIs, IP geolocation, or weather APIs
    if (url.pathname.startsWith('/api/') || 
        url.pathname === '/willyproxy' ||
        url.hostname.includes('googleapis.com') ||
        url.hostname.includes('ipwho.is') ||
        url.hostname.includes('geojs.io') ||
        url.hostname.includes('freeipapi.com') ||
        url.hostname.includes('open-meteo.com') ||
        url.hostname.includes('willyweather.com.au') ||
        url.hostname.includes('openstreetmap.org')) {
        return;
    }

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
                    return caches.match('./', { ignoreSearch: true }).then(res => res || caches.match('index.html', { ignoreSearch: true }));
                })
        );
        return;
    }

    // 2. Core Scripts & Styles (JS/CSS) - Network-first when online with instant offline cache fallback
    if (url.origin === self.location.origin && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css'))) {
        event.respondWith(
            fetch(req)
                .then((networkRes) => {
                    if (networkRes && networkRes.status === 200) {
                        const copy = networkRes.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
                    }
                    return networkRes;
                })
                .catch(() => caches.match(req, { ignoreSearch: true }))
        );
        return;
    }

    // 3. Static Media Assets (Images, Icons, Fonts, CDNs) - Cache-first with background network refresh
    if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/i) || url.hostname.includes('unpkg.com') || url.hostname.includes('fonts.gstatic.com')) {
        event.respondWith(
            caches.match(req, { ignoreSearch: true }).then((cachedRes) => {
                if (cachedRes) {
                    // Fetch in background to update cache for next time
                    fetch(req).then((freshRes) => {
                        if (freshRes && freshRes.status === 200) {
                            caches.open(CACHE_NAME).then((cache) => cache.put(req, freshRes));
                        }
                    }).catch(() => {});
                    return cachedRes;
                }

                return fetch(req).then((networkRes) => {
                    if (networkRes && networkRes.status === 200) {
                        const copy = networkRes.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
                    }
                    return networkRes;
                }).catch(() => caches.match(req, { ignoreSearch: true }));
            })
        );
        return;
    }

    // 4. Default: Fetch with cache fallback
    event.respondWith(
        fetch(req).catch(() => caches.match(req))
    );
});
