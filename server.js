const express = require("express");
const next = require("next");
const { resolve } = require("path");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // sw.js 로 들어오면 유저에게 static file을 전달함
    // 초반에만 이렇게 함. service-worker는 항상 루트 폴더에 있어야 하기 때문 (/static에 있으면 안됨)
    // 어디에서든지 service worker에 접근할 수 있게 됨
    server.get("/sw.js", (req, res) => {
      app.serveStatic(req, res, resolve("./static/service-worker.js"));
    });

    server.get("/category/:name", (req, res) => {
      const actualPage = "/category";
      const queryParams = { name: req.params.name };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/product/:id", (req, res) => {
      const actualPage = "/product";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
