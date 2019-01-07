// install -> serviceworker가 등록됐을 때 발생
self.addEventListener("install", event => {
  const offlinePage = new Request("/");
  event.waitUntil(
    fetch(offlinePage).then(response => {
      return caches.open("n-store").then(cache => {
        // 유저 컴퓨터 안의 폴더를 open
        return cache.put(offlinePage, response);
      });
    })
  );
});

// fetch 이벤트가 발생하면 해당 request를 진행함
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(error => {
      return caches.open("nomad-store").then(cache => cache.match("/"));
    })
  );
});

self.addEventListener("push", event => {
  const title = "N-Store";
  const options = {
    body: event.data.text()
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

/* 
모든 fetch 요청들에 대해서 이벤트로 catch

self.addEventListener("fetch", event => {
    console.log(event)
})
-> 어디에서든 fetch 이벤트들을 catch


유저가 service worker를 가지고 있으면 (이는 자동으로 그렇게 됨) 
해당 페이지의 version을 크롬 cache에 저장
-> cache에 저장해놨던 버전의 페이지를 보여줌

*/
