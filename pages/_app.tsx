import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import PageWithTransition from "../components/PageWithTransition";

function MyApp(pageProps: AppProps) {
  return (
    <Layout>
      <PageWithTransition {...pageProps} />
    </Layout>
  );
}

export default MyApp;
