import { Layout } from "antd";
import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import withNProgress from "next-nprogress";
import NProgressStyles from "next-nprogress/styles";
const { Footer } = Layout;

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  // 모든 페이지에 service worker 설치 (_app은 모든 페이지를 건드리기 때문)
  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(result => console.log("SW Registered: ", result))
        .catch(error => console.log("Can't register SW: ", error));
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <NProgressStyles color="black" spinner={true} />
        <ApolloProvider client={apollo}>
          <Layout>
            <Component {...pageProps} />
            <Footer>This is important</Footer>
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withNProgress()(withApollo(MyApp));

// nprogress error -> v1.1.0으로 설치
