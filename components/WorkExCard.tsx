import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(RelativeTime);
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { TagIcon } from '@heroicons/react/24/solid';

interface IntegerData {
  id: string;
  title: string;
  value?: string;
}
export interface WorkExperience {
  id: string;
  companyName: string;
  jobTitle: string;
  location: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  present?: boolean;
  companyLogo?: { url: string };
  imageFromImageKit: {
    urls: string[];
  };
  tags?: IntegerData[];
}

export default (wx: WorkExperience) => {
  console.log(wx);
  return (
    <div className="p-2 border-b text-stone-500">
      <p className="text-3xl flex justify-between mb-2">
        <span className=" uppercase">{wx.companyName}</span>
        {wx.imageFromImageKit.urls && (
          <Image
            width={120}
            height={80}
            alt={wx.imageFromImageKit.urls[0]}
            src={wx.imageFromImageKit.urls[0]}
            unoptimized
          />
        )}
      </p>
      <p className="text-sm text-stone-400">{wx.jobTitle}</p>
      <p className="flex justify-between items-end  text-stone-400 text-sm">
        <span className="">
          {dayjs(wx.startTime).format('YYYY/MM')} ~{' '}
          {dayjs(wx.endTime).format('YYYY/MM')}{' '}
          {dayjs(wx.startTime).to(dayjs(wx.endTime), true)}
        </span>
        <span>{wx.location}</span>
      </p>
      <ReactMarkdown
        className="p-2 text-md break-words"
        components={{
          ul: ({ children }) => (
            <ul className=" list-inside list-disc ">{children}</ul>
          )
        }}
      >
        {wx.description}
      </ReactMarkdown>
      {wx.tags && (
        <p className="flex gap-2 my-4 items-center flex-wrap">
          <TagIcon className="w-4 h-4" />
          <span>Tags:</span>
          {wx.tags.map((x) => {
            return (
              <i
                key={'tag-' + x.id}
                className="lowercase rounded text-white bg-slate-400 px-2 "
              >
                {x.title}
              </i>
            );
          })}
        </p>
      )}
    </div>
  );
};
