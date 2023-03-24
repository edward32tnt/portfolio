import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import notion from '../../../libs/notion';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { AppProps } from 'next/app';
import ReactMarkdown from 'react-markdown';
import { useCallback, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Image from 'next/image';
import Head from 'next/head';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import { particlesOptions } from '../../../libs/particlesOptions';
import type { Container, Engine } from 'tsparticles-engine';

const PageDetail: NextPage<AppProps> = ({ pageProps }) => {
  const { page } = pageProps;
  const [mdString, setMdString] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      (async function () {
        const blockId = router.query.id;
        const { mdString } = await fetch('/api/blog/children/' + blockId).then(
          (r) => r.json()
        );
        setMdString(mdString);
      })();
    }
  }, [router.query, router.isReady]);

  const animateClass =
    ' animate-in fade-in-10 slide-in-from-bottm-5 duration-300 ease-linear ';

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
      <Head>
        <title>
          Edward32tnt - portfolio - {page.icon.emoji}{' '}
          {page.properties.Name.title[0].plain_text}
        </title>
      </Head>
      <Particles
        id="Particles-here"
        className="w-full h-full absolute -z-50"
        init={particlesInit}
        loaded={particlesLoadeed}
        options={particlesOptions}
      />

      <div
        className={
          'flex flex-col justify-center md:gap-4 md:p-4 items-center md:relative' +
          animateClass
        }
      >
        <Link
          href="/blog"
          className={
            'w-full p-4 flex items-center gap-2 bg-black text-white ' +
            'md:py-2 md:px-8 md:w-auto md:bg-black md:rounded-xl md:border-2 md:shadow ' +
            'md:hover:bg-white md:hover:text-black '
          }
        >
          <ArrowLeftCircleIcon className="w-6 h-6" />
          <span className="hidden md:block uppercase">List</span>
          <span className="block md:hidden uppercase">Back</span>
        </Link>
        <div className=" bg-white rounded flex flex-col gap-2 pb-4 md:w-8/12  md:rounded md:shadow-xl ">
          {page.cover && (
            <div className="h-[10rem] md:h-[10rem] overflow-hidden">
              <Image
                className="w-full md:rounded"
                src={page.cover.external.url}
                width={900}
                height={900}
                alt={'banner'}
              />
            </div>
          )}

          <div className="px-4 py-4 md:flex md:justify-between md:items-center border-b">
            <h1 className="text-4xl">
              {page.icon.emoji} {page.properties.Name.title[0].plain_text}
            </h1>
            <span className="text-sm text-stone-400">
              {dayjs(page.created_time).format('YYYY-MM-DD')}
            </span>
          </div>
          {mdString.length > 0 ? (
            <ReactMarkdown
              className={animateClass + ' px-4'}
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl pb-1">{children}</h2>
                ),
                ul: ({ children }) => (
                  <ul className="pl-4 list-inside list-disc py-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="pl-4 list-inside list-decimal py-1">
                    {children}
                  </ol>
                )
              }}
            >
              {mdString}
            </ReactMarkdown>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blockId = context.query.id;
  const page = await notion.pages.retrieve({
    page_id: blockId as string
  });
  return {
    props: {
      page
    }
  };
};

export default PageDetail;
