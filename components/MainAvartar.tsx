import Image from 'next/image';
import {
  CloudArrowDownIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

import avartarImg from '../public/avatarImg.png';
import Link from 'next/link';

const MainAvartar = () => {
  return (
    <section className="flex flex-col items-center h-[30rem] w-2/5">
      <div className="bg-cover bg-center bg-avartar w-full grow rounded-t-xl"></div>
      <div className="flex flex-col justify-end items-center w-full h-[8rem] bg-white bg-opacity-20">
        <Image
          alt="avatarImg"
          className="rounded-full border -translate-y-4"
          src={avartarImg}
          height={120}
          width={120}
        />
        <span className="group-hover:text-white">Edward Zhao</span>
        <span className="group-hover:text-white">
          Full Stack Engineer - HF - Team Leader
        </span>
      </div>
      <div className="flex gap-2 justify-between w-full h-auto rounded-bl-xl rounded-br-xl p-1 bg-white bg-opacity-40">
        <Link href="" className="big-btn group">
          <CodeBracketIcon className="w-8 h-8" />
          <span className="group-hover:text-white">Linkedin</span>
        </Link>
        <Link href="" className="big-btn group">
          <CloudArrowDownIcon className="w-8 h-8" />
          <span className="group-hover:text-white">Resume</span>
        </Link>
      </div>
    </section>
  );
};

export default MainAvartar;
