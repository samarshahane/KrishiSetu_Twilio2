const CACHE_NAME = 'krishisetu-cache-v1';

// Add the default files you want to cache here
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/js/bundle.js',
  // You might want to cache some specific static assets here
];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  const isApiRoute = event.request.url.includes('/api/users/profile') || event.request.url.includes('/api/firecrawl/sync');

  // Network-First Strategy for API Data (Stops stale data, works offline)
  if (isApiRoute && event.request.method === 'GET') {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // network failed, return from cache
        return caches.match(event.request);
      })
    );
    return;
  }

  // Cache-First Strategy for Static Assets
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                if (event.request.method === 'GET' && !event.request.url.includes('/api/')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(() => {
            if (event.request.headers.get('accept').includes('text/html')) {
                return caches.match('/index.html');
            }
        });
      })
  );
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
        return null;
      })
    ))
  );
});
