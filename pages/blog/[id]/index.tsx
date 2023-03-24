import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import notion, { n2m } from '../../../libs/notion';
import { BackspaceIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';

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
    ' animate-in fade-in-10 slide-in-from-right-5 duration-300 ease-linear ';
  return (
    <div className="p-1 flex flex-col gap-1">
      <Link
        href="/blog"
        className="py-2 px-4 rounded flex items-center gap-2 bg-stone-600 text-white"
      >
        <BackspaceIcon className="w-6 h-6" />
        <span>Back</span>
      </Link>
      <div className=" bg-gray-200 rounded p-4 flex flex-col gap-2">
        {page && <h1 className="text-4xl">{page.child_page.title}</h1>}
        {page && (
          <span className="text-sm text-stone-400">
            {dayjs(page.created_time).format('YYYY-MM-DD')}
          </span>
        )}
        {mdString.length > 0 ? (
          <ReactMarkdown
            className={animateClass}
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl py-1">{children}</h2>
              ),
              ul: ({ children }) => (
                <ul className="pl-2 list-inside list-disc py-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="pl-2 list-inside list-decimal py-1">
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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const blockId = context.query.id;
  const page = await notion.blocks.retrieve({
    block_id: blockId as string
  });
  return {
    props: {
      page
    }
  };
};

export default PageDetail;
