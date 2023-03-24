import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import notion from '../../../libs/notion';
import { BackspaceIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { AppProps } from 'next/app';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import Image from 'next/image';
import Head from 'next/head';

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
  return (
    <>
      <Head>
        <title>
          {page.icon.emoji} {page.properties.Name.title[0].plain_text}
        </title>
      </Head>

      <div
        className={'flex flex-col md:bg-black md:bg-opacity-10 ' + animateClass}
      >
        <Link
          href="/blog"
          className="py-2 px-4 flex items-center gap-2 bg-black  text-white md:absolute md:top-10 md:left-10 md:bg-inherit md:rounded"
        >
          <BackspaceIcon className="w-6 h-6" />
          <span className="hidden md:block uppercase">List</span>
          <span className="block md:hidden uppercase">Back</span>
        </Link>
        <div className=" bg-white rounded flex flex-col gap-2 pb-4 md:m-10 md:rounded md:shadow ">
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
