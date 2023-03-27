import Head from 'next/head';
import { useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import MenuPanel from './MenuPanel';
import MainAvatar from './MainAvatar';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';
import { particlesOptions } from '../libs/particlesOptions';
import Footer from './Footer';

interface Props {
  children?: React.ReactElement;
}
export default function Layout(props: Props) {
  const { children } = props;
  const particlesInit = useCallback(async (main: Engine) => {
    // console.log(main);
    await loadFull(main);
  }, []);

  const particlesLoadeed = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <>
      <div
        className={
          ' md:min-h-screen w-full h-full flex flex-col items-center justify-center' +
          ' '
        }
      >
        <Head>
          <title>Portfolio</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Particles
          id="Particles-here"
          className="w-full h-full absolute -z-50"
          init={particlesInit}
          loaded={particlesLoadeed}
          options={particlesOptions}
        />
        <main className="flex md:flex-1 w-full flex-col items-center justify-center text-center">
          <section className="flex flex-col md:flex-row items-start md:gap-4 w-full md:w-auto md:max-w-7xl flex-nowarp justify-start">
            <MenuPanel />
            <MainAvatar />
            <section className="w-full h-[100vh] md:h-auto bg-white md:bg-inherit">
              {children}
            </section>
          </section>
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  );
}
