// sw.js - Middo's Fly Fishing Backcountry Offline Service Worker
const CACHE_NAME = 'fly-fishing-v101600';

// Message Event: Allow web app clients to force immediate skipWaiting & activation
self.addEventListener('message', (event) => {
    if (event.data && (event.data.type === 'SKIP_WAITING' || event.data === 'skipWaiting')) {
        console.log('[Backcountry SW] Force skipWaiting triggered by client update');
        self.skipWaiting();
    }
});

// Core Local Assets to Pre-Cache on Install for 100% Offline Backcountry Reliability
const CORE_ASSETS = [
    './',
    '/',
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

// Helper: Match App Shell across root, relative, or index paths
async function getCachedAppShell(req) {
    const cache = await caches.open(CACHE_NAME);
    let match = null;
    if (req) {
        match = await cache.match(req, { ignoreSearch: true });
        if (match) return match;
    }
    match = await cache.match('./', { ignoreSearch: true });
    if (match) return match;
    match = await cache.match('index.html', { ignoreSearch: true });
    if (match) return match;
    match = await cache.match('/', { ignoreSearch: true });
    return match;
}

// Install Event: Resilient individual pre-caching of core app shell & offline assets
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('[Backcountry SW] Pre-caching core app shell & offline assets (v101600)...');
            return Promise.allSettled(
                CORE_ASSETS.map((url) =>
                    fetch(url, { mode: url.startsWith('http') ? 'cors' : 'same-origin' })
                        .then(async (res) => {
                            if (res && res.ok) {
                                await cache.put(url, res.clone());
                                // Also ensure root '/' and 'index.html' are populated when './' succeeds
                                if (url === './') {
                                    try { await cache.put('/', res.clone()); } catch(e){}
                                    try { await cache.put('index.html', res.clone()); } catch(e){}
                                }
                            }
                        })
                        .catch((err) => {
                            console.warn('[Backcountry SW] Asset skipped during pre-cache:', url);
                        })
                )
            );
        })
    );
});

// Activate Event: Clean up outdated caches and immediately claim clients
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

// Fetch Event: Offline-First Architecture for Remote Backcountry Areas
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Skip non-GET requests
    if (req.method !== 'GET') return;

    // DIRECT NETWORK ONLY: Serverless proxy endpoints, dynamic IP geo, live weather API, dynamic map tiles
    if (url.pathname.startsWith('/api/') || 
        url.pathname === '/willyproxy' ||
        url.hostname === 'maps.googleapis.com' ||
        url.hostname.includes('ipwho.is') ||
        url.hostname.includes('geojs.io') ||
        url.hostname.includes('freeipapi.com') ||
        url.hostname.includes('open-meteo.com') ||
        url.hostname.includes('willyweather.com.au') ||
        url.hostname.includes('tile.openstreetmap.org')) {
        return;
    }

    // 1. Navigation requests (HTML page loads) - Instant offline app shell / Fast 1.2s network race
    if (req.mode === 'navigate') {
        event.respondWith((async () => {
            // In remote areas with zero connectivity, return cached app shell in 0ms!
            if (!navigator.onLine) {
                console.log('[Backcountry SW] Device offline - serving cached app shell immediately (0ms)');
                const cached = await getCachedAppShell(req);
                if (cached) return cached;
            }

            // If online or unknown, race network against a 1.2s timeout guard to avoid "Lie-Fi" freezes
            try {
                const fetchPromise = fetch(req).then(async (networkRes) => {
                    if (networkRes && networkRes.status === 200) {
                        const copy = networkRes.clone();
                        const cache = await caches.open(CACHE_NAME);
                        await cache.put(req, copy);
                    }
                    return networkRes;
                });

                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Backcountry network timeout')), 1200)
                );

                return await Promise.race([fetchPromise, timeoutPromise]);
            } catch (err) {
                console.log('[Backcountry SW] Network race timed out or offline - serving cached app shell');
                const cached = await getCachedAppShell(req);
                if (cached) return cached;
                throw err;
            }
        })());
        return;
    }

    // 2. Core Scripts & Styles (JS/CSS/JSON) - Cache-First with Background Stale-While-Revalidate
    if (url.origin === self.location.origin && (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.json'))) {
        event.respondWith((async () => {
            const cachedRes = await caches.match(req, { ignoreSearch: true });
            if (cachedRes) {
                // Return cached version in 0ms so the app starts instantly offline
                if (navigator.onLine) {
                    // Revalidate in background without blocking execution
                    fetch(req).then(async (freshRes) => {
                        if (freshRes && freshRes.status === 200) {
                            const cache = await caches.open(CACHE_NAME);
                            await cache.put(req, freshRes);
                        }
                    }).catch(() => {});
                }
                return cachedRes;
            }

            // If not in cache, fetch from network and store for subsequent offline launches
            try {
                const networkRes = await fetch(req);
                if (networkRes && networkRes.status === 200) {
                    const copy = networkRes.clone();
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(req, copy);
                }
                return networkRes;
            } catch (err) {
                return (await caches.match(req, { ignoreSearch: true })) || (await getCachedAppShell());
            }
        })());
        return;
    }

    // 3. Static Media Assets, CDNs & Fonts - Cache-First with Background Refresh
    if (url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico|woff2?|ttf|eot)$/i) || 
        url.hostname.includes('unpkg.com') || 
        url.hostname.includes('fonts.googleapis.com') || 
        url.hostname.includes('fonts.gstatic.com')) {
        event.respondWith((async () => {
            const cachedRes = await caches.match(req, { ignoreSearch: true });
            if (cachedRes) {
                if (navigator.onLine) {
                    fetch(req).then(async (freshRes) => {
                        if (freshRes && freshRes.status === 200) {
                            const cache = await caches.open(CACHE_NAME);
                            await cache.put(req, freshRes);
                        }
                    }).catch(() => {});
                }
                return cachedRes;
            }

            try {
                const networkRes = await fetch(req);
                if (networkRes && networkRes.status === 200) {
                    const copy = networkRes.clone();
                    const cache = await caches.open(CACHE_NAME);
                    await cache.put(req, copy);
                }
                return networkRes;
            } catch (err) {
                return caches.match(req, { ignoreSearch: true });
            }
        })());
        return;
    }

    // 4. Default: Cache match with network fallback
    event.respondWith(
        caches.match(req, { ignoreSearch: true }).then((cached) => {
            return cached || fetch(req).catch(() => caches.match('./', { ignoreSearch: true }));
        })
    );
});
