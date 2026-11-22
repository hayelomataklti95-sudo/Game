var C="ludo-v4",PRE=["./play.html","play-manifest.webmanifest","play-icon-192.png","play-icon-512.png","play-me.jpg","play-splash.jpg","play-dice.mp3","play-home.mp3","play-hiss.mp3"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return Promise.all(PRE.map(function(u){return c.add(u).catch(function(){})}))}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)});return res}).catch(function(){return caches.match(r)}));
});
