import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import PageWithTransition from '../components/PageWithTransition';
import { MainInfo } from '../components/MainAvatar';
import { mainInfoContext } from '../libs/mainInfoContext';

interface Props {
  mainInfo: MainInfo;
}

function MyApp(props: Props & AppProps) {
  const { mainInfo } = props.pageProps;
  const { Component } = props;
  if (mainInfo) {
    return (
      <mainInfoContext.Provider value={{ mainInfo }}>
        <Layout>
          <PageWithTransition {...props} />
        </Layout>
      </mainInfoContext.Provider>
    );
  }
  return <Component {...props} />;
}

export default MyApp;
