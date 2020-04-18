"use strict";
const cacheName = "chargemap-cache";
const filesToCache = [
    "./",
    "./index.html",
    "./manifest.json",
    "./favicon.ico",
    "./css/style.css",
    "./img/icon.png",
    "./img/logo.svg",
    "./img/splash.png",
    "./js/example.js",
    "./modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css",
    "./modules/@fortawesome/fontawesome-free/css/all.min.css",
    "./modules/leaflet/dist/leaflet.css",
    "./modules/leaflet/dist/leaflet.js",
    "./modules/esri-leaflet/dist/esri-leaflet.js",
    "./modules/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js",
    "./modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2",
    "./modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff",
    "./modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf",
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(cacheName);
                return cache.addAll(filesToCache);
            } catch (error) {
                console.log(error);
            }
        })()
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            try {
                const response = await caches.match(e.request);

                console.log(response);

                return response || fetch(e.request);
            } catch (error) {
                console.log(error);
            }
        })()
    );
});
