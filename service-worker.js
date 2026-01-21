const CACHE_NAME='cornhole-roast-pwa-v2';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));self.clients.claim();});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return; if(r.headers.get('accept')?.includes('text/html')){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));}else{e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,cp));return res;})));}});
