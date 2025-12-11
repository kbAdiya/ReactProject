

const CACHE_NAME = "app-shell-v1";
const APP_SHELL_ASSETS = [
  "/",
  "/index.html",
  "/icons/icon1.png",
  "/icons/icon2.png",
  "/manifest.json",
  "/index.css"
];


self.addEventListener("install", (event) => {
  console.log("SW Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL_ASSETS))
  );
  self.skipWaiting();
});


self.addEventListener("activate", (event) => {
  console.log("SW Activating...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});


function isPrivateEndpoint(url) {
  return (
    url.hostname.includes("firebaseapp.com") ||
    url.hostname.includes("firebasestorage.app") ||
    url.hostname.includes("firestore.googleapis.com") ||
    url.hostname.includes("identitytoolkit.googleapis.com") ||
    url.hostname.includes("securetoken.googleapis.com")
  );
}

function isPublicAPI(url) {
  return (
    url.hostname === "musicbrainz.org" ||
    url.hostname === "coverartarchive.org" ||
    url.hostname === "en.wikipedia.org"
  );
}


self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.pathname.includes("@vite") || url.search.includes("token=")) {
     return; 
  }
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;
  if (isPrivateEndpoint(url)) return;

  event.respondWith((async () => {
   
    if (isPublicAPI(url)) {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);

      try {
        const response = await fetch(request);
        if (response && response.ok) {
         
          cache.put(request, response.clone());
        }
        return cached || response;
      } catch (err) {
        return cached || new Response(JSON.stringify({ extract: "Offline" }), {
      headers: { "Content-Type": "application/json" },
    });    //caches.match("/index.html");
      }
    }

    if (request.mode === "navigate") {
      try {
        return await fetch(request);
      } catch (err) {
        return caches.match("/index.html");
      }
    }

    if (url.origin === self.location.origin) {
      const cached = await caches.match(request);
      if (cached) return cached;

      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        return cached || caches.match("/index.html");
      }
    }

   
    try {
      return await fetch(request);
    } catch (err) {
      return caches.match(request);
    }
  })());
});

