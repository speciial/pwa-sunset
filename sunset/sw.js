const cacheName = "pwaCache";
const fileCache = [
    "./",
    "./index.html",
    "./favicon.ico",
    "./js/main.js",
    "./css/style.css",
    "./images/hello-icon-128.png",
    "./images/hello-icon-144.png",
    "./images/hello-icon-152.png",
    "./images/hello-icon-192.png",
    "./images/hello-icon-256.png",
    "./images/hello-icon-512.png",
    "./images/picture.jpg",
    "./fonts/",
    "./webfonts/"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(cacheName);
                cache.addAll(fileCache);
            } catch (error) {
                console.log(error);
            }
        })()
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            try {
                const response = await caches.match(event.request);
                return response || fetch(event.request);
            } catch (error) {
                console.log(error);
            }
        })()
    );
});
