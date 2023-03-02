import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { menuData } from "../libs/menus";
import { useRouter } from "next/router";

interface Props {
  children?: React.ReactElement
}
export default function Layout({ children }:Props) {
  const { asPath } = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <section className="flex flex-row items-start gap-4 max-w-4xl flex-nowarp justify-start sm:w-full">
          <section className='rounded-xl p-1 text-left w-2/8'>
            {menuData.map((menu, index) => {
              return (
                <Link
                  href={menu.route}
                  key={`menuButton${index}`}
                  className={(asPath !== menu.route ? 'hover:bg-gray-400' : 'bg-gray-200') + ' flex items-center gap-2 w-full p-2 ease-linear duration-200 rounded-lg my-1 group'}
                >
                  {asPath !== menu.route ? 
                    <menu.icon className='w-8 h-8 group-hover:stroke-white' /> :
                    <menu.activeIcon className='w-8 h-8' />
                  }
                  <span className='group-hover:text-white'>{menu.name}</span>
                </Link>
              )
            })}
          </section>
          <section className='rounded-xl border p-6 text-left w-full h-full ease-linear duration-200 shadow-md hover:shadow-xl hover:shadow-gray-200'>
            {children}
          </section>
        </section>
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

