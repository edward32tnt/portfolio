import { BuildingLibraryIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
export interface EducationProps {
  id: string;
  major: string;
  present: boolean;
  schoolName: string;
  startTime: Date;
  endTime: Date;
}

const EducationCard = (ed: EducationProps) => {
  return (
    <div className="border-b p-2 w-full">
      <p className=" text-xl text-stone-500 flex gap-2 items-end my-2">
        <BuildingLibraryIcon className="w-8 h-8" />
        <span>{ed.schoolName}</span>
      </p>
      <p className="text-sm text-stone-400 ">
        {dayjs(ed.startTime).format('YYYY/MM')} ~{' '}
        {dayjs(ed.endTime).format('YYYY/MM')}
      </p>
      <p className="text-sm text-stone-400">{ed.major}</p>
    </div>
  );
};

export default EducationCard;
