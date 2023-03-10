import { CubeIcon } from '@heroicons/react/24/outline';

interface Props {
  title: string;
  value: number;
  onClick?: Function;
  isExpand?: boolean;
}
export default function SkillCard({ title, value, onClick, isExpand }: Props) {
  return (
    <div
      className={
        ' p-2 border-b group duration-200 ease-in-out cursor-pointer ' +
        ` hover:text-teal-600 ${
          isExpand ? ' scale-125 text-teal-600 ' : '  text-slate-600'
        }`
      }
      onClick={() => onClick && onClick()}
    >
      <p className=" text-md text-left opacity-80 flex justify-start items-center gap-2">
        <CubeIcon className="h-4 w-4" />
        <span className="">{title}</span>
      </p>
      <div className="flex w-full justify-center items-center gap-4">
        <div className="bg-gray-300 h-3 rounded w-full">
          <div
            className={`h-3 rounded group-hover:bg-teal-600 duration-200 ease-linear ${
              isExpand ? 'bg-teal-600' : 'bg-slate-400 '
            }`}
            style={{
              width: value * 10 + '%'
            }}
          ></div>
        </div>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}
