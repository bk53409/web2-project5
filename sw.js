self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('bakini-recepti-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          'icon.png',
          'script.js',
          'styles.css',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });