import Head from "next/head";
import Image from "next/image";
import { useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";
import MenuPanel from "./MenuPanel";
import MainAvartar from "./MainAvartar";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from "../libs/particlesOptions";

interface Props {
  children?: React.ReactElement;
}
export default function Layout({ children }: Props) {
  const particlesInit = useCallback(async (main) => {
    console.log(main);
    await loadFull(main);
  }, []);

  const particlesLoadeed = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Portfolio</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Particles
          id="Particles-here"
          init={particlesInit}
          options={particlesOptions}
        />
        <main className="flex w-full flex-1 flex-col items-center justify-center text-center">
          <section className="flex flex-row items-start gap-4 max-w-7xl flex-nowarp justify-start sm:w-full">
            <MenuPanel />
            <MainAvartar />
            <section className="w-full">{children}</section>
          </section>
        </main>
        <footer className="flex h-24 w-full items-center justify-center border-t">
          <a
            className="flex items-center justify-center gap-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </a>
        </footer>
      </div>
      <Analytics />
    </>
  );
}
