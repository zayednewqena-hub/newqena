const SHELL='qena-shell-v1';
const FILES=['./','index.html','manifest.webmanifest','lib/leaflet.js','lib/leaflet.css','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==SHELL).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;           // خرائط الأساس تتحمّل من النت عادي
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
