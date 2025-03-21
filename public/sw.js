importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";
// TODO: replace the following with the correct offline fallback page, e.g., "offline.html"
const offlineFallbackPage = "ToDo-replace-this-name.html";

// Skip waiting on message
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Cache the offline fallback page during install
self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

// Enable navigation preload if supported
if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

// Fetch event for navigation requests with offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;
        if (preloadResp) return preloadResp;
        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// ----------------------------------------------------------
// Periodic Sync: Triggered by the periodic background sync API
// Note: Not all browsers support periodicSync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'periodic-fetch') {
    event.waitUntil(handlePeriodicSync());
  }
});

async function handlePeriodicSync() {
  try {
    console.log('Handling periodic sync');
    // Example: fetch new data and update your cache or database
    const response = await fetch('/api/update');
    if (response.ok) {
      console.log('Periodic sync successful');
    } else {
      console.error('Periodic sync failed: ', response.statusText);
    }
  } catch (error) {
    console.error('Error during periodic sync:', error);
  }
}

// ----------------------------------------------------------
// Background Sync: Triggered when connectivity is regained
self.addEventListener('sync', (event) => {
  if (event.tag === 'myBackgroundSync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  try {
    console.log('Handling background sync');
    // Example: send queued data to your server
    const response = await fetch('/api/sync');
    if (response.ok) {
      console.log('Background sync successful');
    } else {
      console.error('Background sync failed: ', response.statusText);
    }
  } catch (error) {
    console.error('Error during background sync:', error);
  }
}

// ----------------------------------------------------------
// Push Notifications: Listen for push events and show notifications
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'RareUpdates', body: event.data.text() };
    }
  }
  const title = data.title || 'RareUpdates';
  const options = {
    body: data.body || 'Welcome to RareBay. Onboard to get started⚡😎',
    icon: data.icon || '/jhjj-200w.webp',  // Update icon path as needed
    badge: data.badge || '/jhjj-200w.webp', // Update badge path as needed
    data: data.url || '/' // URL to open on notification click
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification click to focus or open a window
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});
