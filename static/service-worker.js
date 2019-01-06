setInterval(() => console.log("Hi"), 5000);

/*

service worker은 항상 업데이트 되지는 않음 -> sync 필요
파일 업데이트 되지 않음 -> 한번 register는 되지만 업데이트는 안됨
-> 두 개의 service worker가 있기 때문
하나는 activate 되기를 기다리고 있음
service worker은 유저와 항상 같이 있는 js 파일임


*/
