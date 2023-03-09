import '../styles/globals.css';
import type { AppProps } from 'next/app';
import App, { AppContext } from 'next/app';
import Layout from '../components/Layout';
import PageWithTransition from '../components/PageWithTransition';
import client from '../libs/apollo';
import { getMainInfo } from '../libs/apolloQuerys';
import { MainInfo } from '../components/MainAvatar';

interface Props {
  mainInfo: MainInfo;
}
function MyApp(pageProps: Props & AppProps) {
  return (
    <Layout mainInfo={pageProps.mainInfo}>
      <PageWithTransition {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  const { data } = await client.query({
    query: getMainInfo
  });
  return {
    ...ctx,
    mainInfo: data.mainInfo
  };
};

export default MyApp;
