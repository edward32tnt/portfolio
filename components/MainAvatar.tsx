import Image from 'next/image';

import { CommandLineIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import classNames from 'classnames';
import { mainInfoContext } from '../libs/mainInfoContext';

export interface MainInfo {
  id: string;
  fullName: string;
  currentTitle: string;
  linkedin: string;
  avatarFromImageKit: {
    urls: string[];
  };
  ImageFromImageKits: [
    {
      urls: string[];
    }
  ];
}
const Mainavatar = () => {
  const { mainInfo } = useContext(mainInfoContext);
  console.log(mainInfo.avatarFromImageKit);
  const bgList = mainInfo.imageFromImageKits.reduce((p, c) => {
    p.push(...c.urls);
    return p;
  }, []);
  const [bgIndex, setBgIndex] = useState(0);
  const [isTransicationing, setIsTransicationing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransicationing(true);
      setTimeout(() => {
        setBgIndex(bgIndex < bgList.length - 1 ? bgIndex + 1 : 0);
        setIsTransicationing(false);
      }, 280);
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [bgIndex]);

  return (
    <section
      className={
        'flex flex-row md:flex-col justify-end items-center md:h-[30rem] md:w-2/5 w-full group md:bg-none' +
        ' '
      }
    >
      <div className=" md:static absolute grow md:rounded-t-xl md:h-[15rem] w-full overflow-hidden ">
        {bgList.map((x, i) => (
          <Image
            alt=""
            key={'slide-image-' + i}
            width={900}
            height={900}
            loading="eager"
            className={
              'rounded-t-xl ease-linear duration-350 repeat-1 fill-mode-forwards grow overflow-auto w-full ' +
              classNames({
                hidden: i !== bgIndex,
                'animate-in fade-in zoom-in-95':
                  i === bgIndex && !isTransicationing,
                'animate-out fade-out zoom-out-95':
                  i === bgIndex && isTransicationing
              })
            }
            src={x}
            // onLoad={handleImageLoaded}
            unoptimized
          />
        ))}
      </div>
      <div className="flex flex-row md:flex-col justify-center md:justify-end gap-4 md:gap-0 items-center w-full h-[8rem] md:bg-white bg-opacity-40 group-hover:bg-opacity-100 duration-150 ease-linear py-2 z-10">
        <Image
          alt="avatarImg"
          className="rounded-full border md:-translate-y-4 w-14 h-14 md:w-24 md:h-24"
          src={mainInfo.avatarFromImageKit.urls[0]}
          height={120}
          width={120}
          unoptimized
        />
        <div className="flex flex-col text-sm md:text-base text-start md:text-center md:text-black text-white md:bg-none md:bg-opacity-0 bg-black bg-opacity-20 p-2 rounded">
          <span>{mainInfo.fullName}</span>
          <span>{mainInfo.currentTitle}</span>
        </div>
      </div>
      <div className="hidden md:flex gap-2 justify-between w-full h-auto rounded-bl-xl rounded-br-xl p-1 md:bg-white bg-opacity-40 group-hover:bg-opacity-100 border-t border-gray-100">
        <Link
          target="_blank"
          href={mainInfo.linkedin}
          className="big-btn group/action"
        >
          <CommandLineIcon className="w-8 h-8" />
          <span className="group-hover/action:text-white">Linkedin</span>
        </Link>
        <Link
          target="_blank"
          href={'https://github.com/edward32tnt/portfolio'}
          className="big-btn group/action"
        >
          <CodeBracketIcon className="w-8 h-8" />
          <span className="group-hover/action:text-white">GitPortfolio</span>
        </Link>
      </div>
    </section>
  );
};

export default Mainavatar;
