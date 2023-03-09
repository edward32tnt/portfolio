import Image from 'next/image';
import {
  CloudArrowDownIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

import avatarImg from '../public/avatarImg.png';
import Link from 'next/link';

const Mainavatar = () => {
  return (
    <section className="flex flex-col items-center h-[30rem] w-2/5 group">
      <div className="bg-cover bg-center bg-avatar w-full grow rounded-t-xl"></div>
      <div className="flex flex-col justify-end items-center w-full h-[8rem] bg-white bg-opacity-40 group-hover:bg-opacity-100 duration-150 ease-linear py-2">
        <Image
          alt="avatarImg"
          className="rounded-full border -translate-y-4"
          src={avatarImg}
          height={120}
          width={120}
        />
        <span className="">Edward Zhao</span>
        <span className="">Full Stack Engineer - HF - Team Leader</span>
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
