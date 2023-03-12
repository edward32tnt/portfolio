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
    <div>
      <p className=" text-xl text-stone-500">{ed.schoolName}</p>
      <p className="text-sm text-stone-400 ">
        {dayjs(ed.startTime).format('YYYY/MM')} -{' '}
        {dayjs(ed.endTime).format('YYYY/MM')}
      </p>
      <p className="text-sm text-stone-400">{ed.major}</p>
    </div>
  );
};

export default EducationCard;
