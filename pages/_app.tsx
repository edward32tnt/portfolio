import '../styles/globals.css';
import type { AppProps } from 'next/app';
import App, { AppContext } from 'next/app';
import Layout from '../components/Layout';
import PageWithTransition from '../components/PageWithTransition';
import client from '../libs/apollo';
import { getMainInfo } from '../libs/apolloQuerys';
import { MainInfo } from '../components/MainAvatar';
import { mainInfoContext } from '../libs/mainInfoContext';

interface Props {
  mainInfo: MainInfo;
}

function MyApp(pageProps: Props & AppProps) {
  return (
    <mainInfoContext.Provider value={{ mainInfo: pageProps.mainInfo }}>
      <Layout>
        <PageWithTransition {...pageProps} />
      </Layout>
    </mainInfoContext.Provider>
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
