import dayjs from 'dayjs';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';
export interface ProjectCardProps {
  id: string;
  images: [
    {
      id: string;
      imageUrl: {
        url: string;
      };
    }
  ];
  projectName: string;
  startTime: Date;
  endTime: Date;
  present: Boolean;
  description: string;
}

const ProjectCard = (pc: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenDetail = () => {
    console.log('handleOpenDetail');
    setIsOpen(true);
  };
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className=" fixed top-0 w-full h-full bg-gray-50 opacity-60 ease-linear duration-200"
            onClick={() => setIsOpen(false)}
          >
            <div>{pc.projectName}</div>
          </div>,
          document.body
        )}
      <div
        className="flex justify-center flex-col text-center text-stone-500 cursor-pointer rounded border"
        onClick={handleOpenDetail}
      >
        {pc.images.map((x) => (
          <Image
            key={'project-image-' + x.id}
            className=" shadow-md"
            src={x.imageUrl.url}
            width={120}
            height={120}
            alt={pc.projectName}
          />
        ))}
        <p>{pc.projectName}</p>
        <p>
          {dayjs(pc.startTime).format('YYYY/MM')} ~{' '}
          {pc.present ? 'Present' : dayjs(pc.endTime).format('YYYY/MM')}
        </p>
        <ReactMarkdown>{pc.description}</ReactMarkdown>
      </div>
    </>
  );
};

export default ProjectCard;
