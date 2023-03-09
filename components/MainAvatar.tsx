import Image from 'next/image';

import {
  CloudArrowDownIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

import avatarImg from '../public/avatarImg.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import bg1 from '../public/bg1.jpg';
import bg2 from '../public/bg2.jpg';
import bg3 from '../public/bg3.jpg';
import classNames from 'classnames';

export interface MainInfo {
  id: string;
  fullName: string;
  currentTitle: string;
  mainBackground: [
    {
      id: string;
      imageUrl: {
        url: string;
      };
    }
  ];
}
interface Props {
  mainInfo: MainInfo;
}

const Mainavatar = ({ mainInfo }: Props) => {
  const bgList = mainInfo.mainBackground.map((x) => x.imageUrl.url);
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
    <section className="flex flex-col items-center h-[30rem] w-2/5 group">
      <div className="grow rounded-t-xl h-[15rem] w-full overflow-hidden">
        <Image
          alt=""
          width={400}
          height={400}
          className={
            'rounded-t-xl w-full grow overflow-auto object-top ' +
            classNames({
              'animate-slideScaleEnter': !isTransicationing,
              'animate-slideScaleLeave': isTransicationing
            })
          }
          src={bgList[bgIndex]}
        />
      </div>
      <div className="flex flex-col justify-end items-center w-full h-[8rem] bg-white bg-opacity-40 group-hover:bg-opacity-100 duration-150 ease-linear py-2">
        <Image
          alt="avatarImg"
          className="rounded-full border -translate-y-4"
          src={avatarImg}
          height={120}
          width={120}
        />
        <span className="">{mainInfo.fullName}</span>
        <span className="">{mainInfo.currentTitle}</span>
      </div>
      <div className="flex gap-2 justify-between w-full h-auto rounded-bl-xl rounded-br-xl p-1 bg-white bg-opacity-40 group-hover:bg-opacity-100 border-t border-gray-100">
        <Link href="" className="big-btn group/action">
          <CodeBracketIcon className="w-8 h-8" />
          <span className="group-hover/action:text-white">Linkedin</span>
        </Link>
        <Link href="" className="big-btn group/action">
          <CloudArrowDownIcon className="w-8 h-8" />
          <span className="group-hover/action:text-white">Resume</span>
        </Link>
      </div>
    </section>
  );
};

export default Mainavatar;