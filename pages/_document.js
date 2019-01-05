import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="author" content={"Euijin"} />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.6/antd.min.css"
            rel="stylesheet"
          />
          <style>{`body { background-color: #EFF2F5!important}`}</style>
          <meta name="theme-color" content="black" />
          <meta name="viewport" content="width=device-width, initail-scale=1" />
          <meta name="description" content="N-Store, buy all your nomad swag" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

// document 수정하면 서버 재시작 필요

/* 
meta name viewport -> 웹사이트가 어디서 보여지고 있는지 의미
device-width : width가 디바이스의 width와 같음


*/
