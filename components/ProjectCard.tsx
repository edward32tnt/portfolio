import dayjs from 'dayjs';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ProjectModalView from './ProjectModalView';
export interface ProjectCardProps {
  id: string;
  imageFromImageKit: {
    urls: string[];
  };
  images?: [
    {
      id: string;
      imageUrl: {
        width: number;
        height: number;
        url: string;
      };
    }
  ];
  role: string;
  projectName: string;
  startTime: Date;
  endTime: Date;
  present: Boolean;
  description: string;
}

const ProjectCard = (pc: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenDetail = () => {
    setIsOpen(true);
  };
  return (
    <>
      {isOpen &&
        createPortal(
          <ProjectModalView onClose={() => setIsOpen(false)} {...pc} />,
          document.body
        )}
      <div
        className="flex justify-center flex-col items-center text-center text-stone-500 cursor-pointer border-b md:border-b-0"
        onClick={handleOpenDetail}
      >
        {pc.imageFromImageKit.urls.length > 0 && (
          <Image
            className=" w-full h-[200px] overflow-hidden"
            src={pc.imageFromImageKit.urls[0]}
            width={300}
            height={300}
            alt={pc.projectName}
            loading="eager"
            unoptimized
          />
        )}
        <p className="my-2">{pc.projectName}</p>
        <p>
          {dayjs(pc.startTime).format('YYYY/MM')} ~{' '}
          {pc.present ? 'Present' : dayjs(pc.endTime).format('YYYY/MM')}
        </p>
      </div>
    </>
  );
};

export default ProjectCard;
