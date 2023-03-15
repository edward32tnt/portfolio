import { ProjectCardProps } from './ProjectCard';
import { XCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { MouseEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

interface Props {
  onClose: Function;
}
const ProjectModalView = (props: ProjectCardProps & Props) => {
  const bgList = props.images.map((x) => x.imageUrl);
  const [bgIndex, setBgIndex] = useState(0);
  const [isTransicationing, setIsTransicationing] = useState(false);
  const handleClose: MouseEventHandler = (e) => {
    if (e.target == e.currentTarget) {
      props.onClose();
    }
  };

  const handleBgChange = (index: number) => {
    setIsTransicationing(true);
    setTimeout(() => {
      setBgIndex(index);
      setIsTransicationing(false);
    }, 280);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleBgChange(bgIndex < bgList.length - 1 ? bgIndex + 1 : 0);
    }, 4000);
    return () => {
      clearInterval(timer);
    };
  }, [bgIndex]);

  return (
    <div
      className=" fixed top-0 w-full h-full bg-black bg-opacity-60 ease-linear duration-200 flex justify-center items-center"
      onClick={(e) => handleClose(e)}
    >
      <div className=" text-black w-3/4 h-2/3 p-4 rounded relative grid grid-cols-4">
        <XCircleIcon
          onClick={() => props.onClose()}
          className="text-white cursor-pointer absolute -top-8 -right-8 w-8 h-8 animate-in fade-in duration-200"
        />
        <div className=" col-span-3 rounded-bl rounded-tl bg-white animate-in h-full fade-in slide-in-from-left ease-in-out overflow-scroll duration-200 flex flex-col justify-between items-center border-r p-4">
          <Image
            alt=""
            width={bgList[bgIndex].width}
            height={bgList[bgIndex].height}
            quality={100}
            className={
              'repeat-1 fill-mode-forwards h-5/6 w-auto ' +
              classNames({
                'animate-in fade-in zoom-in-50': !isTransicationing,
                'animate-out fade-out zoom-out-50': isTransicationing
              })
            }
            src={bgList[bgIndex].url}
          />
          <div className="p-4 flex gap-4">
            {bgList.map((_, index) => {
              return (
                <button
                  key={'slider-button-' + index}
                  onClick={() => handleBgChange(index)}
                  className={
                    'h-1 w-6 bg-black ' +
                    classNames({
                      'bg-opacity-30': index !== bgIndex
                    })
                  }
                ></button>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-br rounded-tr animate-in fade-in slide-in-from-right ease-in-out p-4 overflow-scroll duration-200">
          <p className="text-xl">{props.projectName}</p>
          <p className="text-sm text-stone-500 my-1">{props.role}</p>
          <p className="text-sm text-stone-500 my-1">
            {dayjs(props.startTime).format('YYYY/MM')} ~{' '}
            {props.present ? 'Present' : dayjs(props.endTime).format('YYYY/MM')}
          </p>
          <ReactMarkdown
            className="text-sm"
            components={{
              ul: ({ children }) => (
                <ul className=" list-inside break-after-auto">{children}</ul>
              ),
              li: ({ children }) => <li className=" my-1 p-1">{children}</li>
            }}
          >
            {props.description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ProjectModalView;
